## Запуск проекта под Windows и macOS

### Требования
- Python 3.12+ установлен в системе
- Git (для клонирования репозитория)

### 1. Клонирование репозитория
```bash
git clone <url-репозитория> Education
cd Education
```

### 2. Создание и активация виртуального окружения
- **Windows (PowerShell)**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

- **macOS / Linux (bash/zsh)**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Установка зависимостей
```bash
pip install -r requirements.txt
```

### 4. Запуск приложения
Запускаем встроенный сервер Flask (подходит для разработки):
```bash
python -m flask --app app.app --debug run
```
По умолчанию приложение будет доступно по адресу http://127.0.0.1:5000

### 5. Дополнительные замечания
- Если порт 5000 занят, укажите другой: `python -m flask --app app.app --debug run --port 8000`
- При работе без `--debug` изменения кода не будут перезагружать сервер автоматически.
- Для остановки сервера нажмите `Ctrl+C` в терминале.

