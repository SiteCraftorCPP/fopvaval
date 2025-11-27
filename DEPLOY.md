# Инструкция по настройке SSL и деплою

## 🚀 Быстрое решение проблемы SSL с русским доменом

**Проблема:** Let's Encrypt не всегда работает с русскими доменами напрямую.

**Решение:** Используй Punycode версию домена для получения SSL сертификата.

### Вариант 1: Автоматический скрипт (рекомендуется)

```bash
# На VPS скопируй и запусти:
chmod +x install-ssl.sh
sudo ./install-ssl.sh
```

### Вариант 2: Вручную

```bash
# 1. Получи сертификат через Punycode
sudo certbot certonly --standalone \
  -d xn--80aacf4ai1b8a.xn--p1ai \
  -d www.xn--80aacf4ai1b8a.xn--p1ai \
  --email your-email@example.com \
  --agree-tos

# 2. Используй конфиг nginx.conf.punycode или обнови пути в nginx.conf.example
sudo cp nginx.conf.punycode /etc/nginx/sites-available/осознанныйвыбор.рф

# 3. Перезапусти nginx
sudo nginx -t && sudo systemctl restart nginx
```

---

## ⚠️ ВАЖНО: Работа с русским доменом (IDN)

Для домена `осознанныйвыбор.рф` нужно использовать **Punycode** версию при работе с SSL.

**Punycode домена:** `xn--80aacf4ai1b8a.xn--p1ai`

### Как получить Punycode версию домена:

```bash
# Вариант 1: Используя Python
python3 -c "import idna; print(idna.encode('осознанныйвыбор.рф').decode('ascii'))"

# Вариант 2: Онлайн конвертер
# https://www.punycoder.com/ или https://www.charset.org/punycode

# Вариант 3: Используя idn (если установлен)
idn осознанныйвыбор.рф
```

## 1. Установка SSL сертификата (Let's Encrypt)

### Способ 1: Использование Punycode (рекомендуется)

```bash
# Установи certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Получи SSL сертификат используя Punycode
sudo certbot certonly --nginx \
  -d xn--80aacf4ai1b8a.xn--p1ai \
  -d www.xn--80aacf4ai1b8a.xn--p1ai \
  --email your-email@example.com \
  --agree-tos \
  --non-interactive

# Или с веб-сервером (standalone mode, если nginx не настроен)
sudo certbot certonly --standalone \
  -d xn--80aacf4ai1b8a.xn--p1ai \
  -d www.xn--80aacf4ai1b8a.xn--p1ai \
  --email your-email@example.com \
  --agree-tos \
  --non-interactive
```

### Способ 2: Использование русского домена (может не работать)

```bash
# Попробуй сначала этот способ, если не работает - используй Способ 1
sudo certbot --nginx -d осознанныйвыбор.рф -d www.осознанныйвыбор.рф
```

### После получения сертификата:

```bash
# Автоматическое обновление сертификата
sudo certbot renew --dry-run

# Проверь, что сертификаты созданы
sudo ls -la /etc/letsencrypt/live/
```

## 2. Настройка nginx

```bash
# Создай директорию для сайта
sudo mkdir -p /var/www/осознанныйвыбор.рф

# Скопируй конфиг nginx
# Если используешь Punycode для SSL (рекомендуется):
sudo cp nginx.conf.punycode /etc/nginx/sites-available/осознанныйвыбор.рф
# Или если используешь русский домен для SSL:
# sudo cp nginx.conf.example /etc/nginx/sites-available/осознанныйвыбор.рф

# Создай симлинк
sudo ln -s /etc/nginx/sites-available/осознанныйвыбор.рф /etc/nginx/sites-enabled/

# ⚠️ ВАЖНО: Если используешь nginx.conf.example вместо nginx.conf.punycode,
# обнови пути к SSL сертификатам в конфиге:
# Если сертификат получен через Punycode, пути будут:
# /etc/letsencrypt/live/xn--80aacf4ai1b8a.xn--p1ai/fullchain.pem
# /etc/letsencrypt/live/xn--80aacf4ai1b8a.xn--p1ai/privkey.pem
#
# Отредактируй файл:
# sudo nano /etc/nginx/sites-available/осознанныйвыбор.рф
#
# И обнови строки:
# ssl_certificate /etc/letsencrypt/live/xn--80aacf4ai1b8a.xn--p1ai/fullchain.pem;
# ssl_certificate_key /etc/letsencrypt/live/xn--80aacf4ai1b8a.xn--p1ai/privkey.pem;

# Проверь конфиг
sudo nginx -t

# Перезапусти nginx
sudo systemctl restart nginx
```

## 3. Деплой проекта

### Вариант 1: Через скрипт deploy.sh
```bash
# Сделай скрипт исполняемым
chmod +x deploy.sh

# Запусти деплой
./deploy.sh
```

### Вариант 2: Вручную
```bash
# Собери проект
npm run build

# Загрузи файлы на VPS
scp -r dist/* user@81.200.151.247:/var/www/осознанныйвыбор.рф/

# На VPS установи права
ssh user@81.200.151.247
sudo chown -R www-data:www-data /var/www/осознанныйвыбор.рф
sudo chmod -R 755 /var/www/осознанныйвыбор.рф
```

## 4. Проверка

После деплоя проверь:
- http://осознанныйвыбор.рф - должен редиректить на HTTPS
- https://осознанныйвыбор.рф - должен открываться сайт с SSL

### Проверка SSL сертификата:

```bash
# Проверь сертификат через командную строку
openssl s_client -connect осознанныйвыбор.рф:443 -servername осознанныйвыбор.рф

# Или онлайн:
# https://www.ssllabs.com/ssltest/analyze.html?d=осознанныйвыбор.рф
```

## 5. Альтернативные решения

### Если Let's Encrypt не работает с русским доменом:

1. **Использовать Cloudflare** (бесплатно):
   - Зарегистрируй домен в Cloudflare
   - Используй их SSL (автоматический)
   - Настрой DNS на VPS

2. **Использовать другой провайдер SSL**:
   - ZeroSSL (бесплатно, поддерживает IDN)
   - SSL For Free
   - Платные: Comodo, DigiCert

3. **Самоподписанный сертификат** (только для тестирования):
   ```bash
   sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
     -keyout /etc/ssl/private/осознанныйвыбор.рф.key \
     -out /etc/ssl/certs/осознанныйвыбор.рф.crt
   ```

## 6. Автообновление SSL

Certbot автоматически настроит обновление через cron. Проверь:
```bash
sudo crontab -l | grep certbot
```

Если нет, добавь вручную:
```bash
sudo crontab -e
# Добавь строку:
0 0,12 * * * certbot renew --quiet
```

