#!/bin/bash

# Скрипт для установки SSL сертификата на русский домен
# Использование: ./install-ssl.sh

set -e

DOMAIN="осознанныйвыбор.рф"
DOMAIN_PUNYCODE="xn--80aacf4ai1b8a.xn--p1ai"
WWW_DOMAIN_PUNYCODE="www.xn--80aacf4ai1b8a.xn--p1ai"
EMAIL=""  # Укажи свой email

echo "🔐 Установка SSL сертификата для $DOMAIN"
echo "Punycode: $DOMAIN_PUNYCODE"
echo ""

# Проверка, запущен ли скрипт от root
if [ "$EUID" -ne 0 ]; then 
    echo "❌ Запусти скрипт с sudo: sudo ./install-ssl.sh"
    exit 1
fi

# Проверка email
if [ -z "$EMAIL" ]; then
    read -p "Введи email для Let's Encrypt: " EMAIL
    if [ -z "$EMAIL" ]; then
        echo "❌ Email обязателен для Let's Encrypt"
        exit 1
    fi
fi

# Установка certbot
echo "📦 Устанавливаем certbot..."
apt update
apt install -y certbot python3-certbot-nginx

# Остановка nginx для standalone режима (если нужно)
echo "⏸️  Останавливаем nginx для получения сертификата..."
systemctl stop nginx 2>/dev/null || true

# Получение сертификата через standalone режим
echo "🔑 Получаем SSL сертификат через Punycode..."
certbot certonly --standalone \
    -d "$DOMAIN_PUNYCODE" \
    -d "$WWW_DOMAIN_PUNYCODE" \
    --email "$EMAIL" \
    --agree-tos \
    --non-interactive \
    --preferred-challenges http

# Проверка успешности
if [ $? -eq 0 ]; then
    echo "✅ Сертификат успешно получен!"
    echo ""
    echo "📝 Пути к сертификатам:"
    echo "   Certificate: /etc/letsencrypt/live/$DOMAIN_PUNYCODE/fullchain.pem"
    echo "   Private Key: /etc/letsencrypt/live/$DOMAIN_PUNYCODE/privkey.pem"
    echo ""
    echo "⚠️  ВАЖНО: Обнови конфиг nginx:"
    echo "   1. Используй nginx.conf.punycode или"
    echo "   2. Обнови пути в nginx.conf.example на:"
    echo "      ssl_certificate /etc/letsencrypt/live/$DOMAIN_PUNYCODE/fullchain.pem;"
    echo "      ssl_certificate_key /etc/letsencrypt/live/$DOMAIN_PUNYCODE/privkey.pem;"
    echo ""
    echo "🔄 Запускаем nginx..."
    systemctl start nginx
    
    echo ""
    echo "✅ Готово! Проверь конфиг nginx и перезапусти его:"
    echo "   sudo nginx -t"
    echo "   sudo systemctl restart nginx"
else
    echo "❌ Ошибка при получении сертификата"
    echo "🔄 Запускаем nginx обратно..."
    systemctl start nginx
    exit 1
fi

# Настройка автообновления
echo ""
echo "🔄 Настраиваем автообновление сертификата..."
certbot renew --dry-run

echo ""
echo "✅ Всё готово!"

