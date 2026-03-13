#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="${APP_ROOT:-/var/www/ssqs/current}"

echo "[1/4] Updating application..."
cd "$APP_ROOT"
rm -rf .next
npm ci
npm run build

echo "[1.5/4] Refreshing standalone static assets..."
mkdir -p .next/standalone/.next
rm -rf .next/standalone/public
rm -rf .next/standalone/.next/static
cp -R public .next/standalone/public
cp -R .next/static .next/standalone/.next/static

echo "[2/4] Restarting service..."
sudo systemctl restart ssqs

echo "[3/4] Checking nginx..."
sudo nginx -t
sudo systemctl reload nginx

echo "[4/4] Service status..."
sudo systemctl --no-pager --full status ssqs || true
