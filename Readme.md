## Запуск проекта под Windows и macOS

### 1. Клонирование репозитория
```bash
git clone <url-репозитория>
cd VKR
```

### 2. Создание и активация виртуального окружения
- **Windows (PowerShell)**
```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
```

- **macOS / Linux**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Установка зависимостей
```bash
pip install -r requirements.txt
```

### 4. Запуск приложения
Запускаем встроенный сервер Flask:
```bash
cd app
flask run
```
По умолчанию приложение будет доступно по адресу http://127.0.0.1:5000
