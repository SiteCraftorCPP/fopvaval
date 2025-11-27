# Скрипт для синхронизации веток (PowerShell)
# Использование: .\sync-branches.ps1

Write-Host "🔄 Синхронизация веток..." -ForegroundColor Cyan

# Получаем последние изменения
Write-Host "📥 Получаем изменения с удаленного репозитория..." -ForegroundColor Yellow
git fetch origin

# Показываем статус веток
Write-Host ""
Write-Host "📊 Статус веток:" -ForegroundColor Cyan
git branch -vv

Write-Host ""
$choice = Read-Host "Какую операцию выполнить?
1) Синхронизировать owner с main (merge main в owner)
2) Объединить owner в main (merge owner в main)
3) Обновить main из owner
4) Показать различия между ветками
Выбери (1-4)"

switch ($choice) {
    "1" {
        Write-Host "🔄 Переключаемся на ветку owner..." -ForegroundColor Yellow
        git checkout owner
        Write-Host "📥 Получаем последние изменения..." -ForegroundColor Yellow
        git pull origin owner
        Write-Host "🔀 Сливаем изменения из main..." -ForegroundColor Yellow
        git merge origin/main
        Write-Host "📤 Отправляем изменения..." -ForegroundColor Yellow
        git push origin owner
        Write-Host "✅ Ветка owner синхронизирована с main" -ForegroundColor Green
    }
    "2" {
        Write-Host "🔄 Переключаемся на ветку main..." -ForegroundColor Yellow
        git checkout main
        Write-Host "📥 Получаем последние изменения..." -ForegroundColor Yellow
        git pull origin main
        Write-Host "🔀 Сливаем изменения из owner..." -ForegroundColor Yellow
        git merge origin/owner
        Write-Host "📤 Отправляем изменения..." -ForegroundColor Yellow
        git push origin main
        Write-Host "✅ Изменения из owner объединены в main" -ForegroundColor Green
    }
    "3" {
        Write-Host "🔄 Переключаемся на ветку main..." -ForegroundColor Yellow
        git checkout main
        Write-Host "📥 Получаем последние изменения из owner..." -ForegroundColor Yellow
        git pull origin owner
        Write-Host "📤 Отправляем изменения..." -ForegroundColor Yellow
        git push origin main
        Write-Host "✅ Main обновлен из owner" -ForegroundColor Green
    }
    "4" {
        Write-Host "📊 Различия между main и owner:" -ForegroundColor Cyan
        git diff main..owner --stat
        Write-Host ""
        Write-Host "📝 Детальные различия:" -ForegroundColor Cyan
        git log main..owner --oneline
    }
    default {
        Write-Host "❌ Неверный выбор" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "✅ Готово!" -ForegroundColor Green

