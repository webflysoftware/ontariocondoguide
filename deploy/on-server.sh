#!/usr/bin/env bash
# Runs on hh3 after CI uploads static files and nginx config.
set -euo pipefail

SITE_ROOT="/var/www/ontariocondoguide"
API_ROOT="/var/www/ontariocondoguide-api"
DATA_ROOT="/var/lib/ontariocondoguide"
NGINX_SITE="ontariocondoguide"
NGINX_AVAILABLE="/etc/nginx/sites-available/${NGINX_SITE}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${NGINX_SITE}"
NGINX_STAGING="/tmp/ontariocondoguide.nginx"
SERVICE_STAGING="/tmp/ontariocondoguide-api.service"

sudo mkdir -p "${SITE_ROOT}" "${API_ROOT}" "${DATA_ROOT}/newsletter"
sudo chown -R dev:dev "${DATA_ROOT}" 2>/dev/null || true

if [[ -f "${SERVICE_STAGING}" ]]; then
  sudo cp "${SERVICE_STAGING}" /etc/systemd/system/ontariocondoguide-api.service
  rm -f "${SERVICE_STAGING}"
  sudo systemctl daemon-reload
  sudo systemctl enable ontariocondoguide-api.service
  sudo systemctl restart ontariocondoguide-api.service
fi

if [[ -f "${NGINX_STAGING}" ]]; then
  sudo cp "${NGINX_STAGING}" "${NGINX_AVAILABLE}"
  sudo ln -sf "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"
  rm -f "${NGINX_STAGING}"
fi

# Validate before reload so a bad config never takes down nginx.
sudo nginx -t
sudo systemctl reload nginx

echo "Deploy complete: ${SITE_ROOT}"
