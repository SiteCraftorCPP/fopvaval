#!/bin/bash

# Скрипт для синхронизации веток
# Использование: ./sync-branches.sh

set -e

echo "🔄 Синхронизация веток..."

# Получаем последние изменения
echo "📥 Получаем изменения с удаленного репозитория..."
git fetch origin

# Показываем статус веток
echo ""
echo "📊 Статус веток:"
git branch -vv

echo ""
read -p "Какую операцию выполнить?
1) Синхронизировать owner с main (merge main в owner)
2) Объединить owner в main (merge owner в main)
3) Обновить main из owner
4) Показать различия между ветками
Выбери (1-4): " choice

case $choice in
    1)
        echo "🔄 Переключаемся на ветку owner..."
        git checkout owner
        echo "📥 Получаем последние изменения..."
        git pull origin owner
        echo "🔀 Сливаем изменения из main..."
        git merge origin/main
        echo "📤 Отправляем изменения..."
        git push origin owner
        echo "✅ Ветка owner синхронизирована с main"
        ;;
    2)
        echo "🔄 Переключаемся на ветку main..."
        git checkout main
        echo "📥 Получаем последние изменения..."
        git pull origin main
        echo "🔀 Сливаем изменения из owner..."
        git merge origin/owner
        echo "📤 Отправляем изменения..."
        git push origin main
        echo "✅ Изменения из owner объединены в main"
        ;;
    3)
        echo "🔄 Переключаемся на ветку main..."
        git checkout main
        echo "📥 Получаем последние изменения из owner..."
        git pull origin owner
        echo "📤 Отправляем изменения..."
        git push origin main
        echo "✅ Main обновлен из owner"
        ;;
    4)
        echo "📊 Различия между main и owner:"
        git diff main..owner --stat
        echo ""
        echo "📝 Детальные различия:"
        git log main..owner --oneline
        ;;
    *)
        echo "❌ Неверный выбор"
        exit 1
        ;;
esac

echo ""
echo "✅ Готово!"

