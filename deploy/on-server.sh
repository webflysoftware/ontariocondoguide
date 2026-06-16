#!/usr/bin/env bash
# Runs on hh3 after CI uploads static files and nginx config.
set -euo pipefail

SITE_ROOT="/var/www/ontariocondoguide"
NGINX_SITE="ontariocondoguide"
NGINX_AVAILABLE="/etc/nginx/sites-available/${NGINX_SITE}"
NGINX_ENABLED="/etc/nginx/sites-enabled/${NGINX_SITE}"
NGINX_STAGING="/tmp/ontariocondoguide.nginx"

sudo mkdir -p "${SITE_ROOT}"

if [[ -f "${NGINX_STAGING}" ]]; then
  sudo cp "${NGINX_STAGING}" "${NGINX_AVAILABLE}"
  sudo ln -sf "${NGINX_AVAILABLE}" "${NGINX_ENABLED}"
  rm -f "${NGINX_STAGING}"
fi

# Validate before reload so a bad config never takes down nginx.
sudo nginx -t
sudo systemctl reload nginx

echo "Deploy complete: ${SITE_ROOT}"
