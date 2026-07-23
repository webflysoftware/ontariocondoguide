#!/usr/bin/env bash
# Runs on hh3 after CI uploads the Nuxt build and config files.
set -euo pipefail

SITE_ROOT="/var/www/nacaro"
NGINX_SITE="nacaro"
NGINX_AVAILABLE="/etc/nginx/sites-available/${NGINX_SITE}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${NGINX_SITE}"
NGINX_STAGING="/tmp/nacaro.nginx"
SERVICE_FILE="/etc/systemd/system/nacaro.service"
SERVICE_STAGING="/tmp/nacaro.service"

sudo mkdir -p "${SITE_ROOT}"
sudo mkdir -p /var/lib/nacaro/contact
sudo chown -R dev:dev "${SITE_ROOT}"
sudo chown -R dev:dev /var/lib/nacaro

if [[ -f "${SERVICE_STAGING}" ]]; then
  sudo cp "${SERVICE_STAGING}" "${SERVICE_FILE}"
  rm -f "${SERVICE_STAGING}"
  sudo systemctl daemon-reload
  sudo systemctl enable nacaro.service
fi

sudo systemctl restart nacaro.service

# Wait for app to start (up to 30 seconds)
echo "Waiting for NACARO app to start..."
for i in {1..30}; do
  if curl -sf http://127.0.0.1:3090/ >/dev/null; then
    echo "NACARO app is responding on port 3090"
    break
  fi
  if [[ $i -eq 30 ]]; then
    echo "Deploy failed: NACARO app not responding on port 3090 after 30 seconds" >&2
    sudo systemctl status nacaro.service --no-pager || true
    exit 1
  fi
  sleep 1
done

if [[ -f "${NGINX_STAGING}" ]]; then
  sudo cp "${NGINX_STAGING}" "${NGINX_AVAILABLE}"
  sudo ln -sf "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"
  rm -f "${NGINX_STAGING}"
fi

sudo nginx -t
sudo systemctl reload nginx

if systemctl is-active --quiet nacaro.service; then
  echo "Deploy complete: ${SITE_ROOT} (nacaro.service running)"
else
  echo "Deploy failed: nacaro.service is not running" >&2
  sudo systemctl status nacaro.service --no-pager || true
  exit 1
fi
