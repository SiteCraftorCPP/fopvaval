#!/bin/bash

# Скрипт деплоя для VPS
# Использование: ./deploy.sh

set -e

DOMAIN="осознанныйвыбор.рф"
VPS_USER="root"  # Измени на своего пользователя
VPS_IP="81.200.151.247"
WWW_DIR="/var/www/$DOMAIN"

echo "🚀 Начинаем деплой..."

# Сборка проекта
echo "📦 Собираем проект..."
npm run build

# Загрузка файлов на VPS
echo "📤 Загружаем файлы на VPS..."
scp -r dist/* $VPS_USER@$VPS_IP:$WWW_DIR/

# Установка прав
echo "🔐 Устанавливаем права..."
ssh $VPS_USER@$VPS_IP "chown -R www-data:www-data $WWW_DIR && chmod -R 755 $WWW_DIR"

echo "✅ Деплой завершен!"

