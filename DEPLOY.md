# Инструкция по настройке SSL и деплою

## 1. Установка SSL сертификата (Let's Encrypt)

```bash
# Установи certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Получи SSL сертификат
sudo certbot --nginx -d осознанныйвыбор.рф -d www.осознанныйвыбор.рф

# Автоматическое обновление сертификата
sudo certbot renew --dry-run
```

## 2. Настройка nginx

```bash
# Создай директорию для сайта
sudo mkdir -p /var/www/осознанныйвыбор.рф

# Скопируй конфиг nginx
sudo cp nginx.conf.example /etc/nginx/sites-available/осознанныйвыбор.рф

# Создай симлинк
sudo ln -s /etc/nginx/sites-available/осознанныйвыбор.рф /etc/nginx/sites-enabled/

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

## 5. Автообновление SSL

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

