#!/usr/bin/env bash
set -e

PROJECT_DIR="$HOME/sites/netnotes"
PUBLIC_DIR="$PROJECT_DIR/public"
TARGET_DIR="/var/www/netnotes"

echo "==> Pulling latest changes"
cd "$PROJECT_DIR"
git pull origin main
git submodule update --init --recursive

echo "==> Building Hugo site"
hugo --minify

echo "==> Deploying to nginx root"
rsync -av --delete --no-owner --no-group "$PUBLIC_DIR/" "$TARGET_DIR/"

echo "==> Done"
