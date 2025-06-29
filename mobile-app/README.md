# Ссылка на видеозапись работы приложения


# Мобильное приложение интернет-магазина

Мобильное приложение на базе Ionic React для интернет-магазина одежды. Приложение подключается к FastAPI бэкенду для получения данных о товарах, управления корзиной и аутентификации пользователей.

## Возможности

- 📱 **Мобильная версия** - оптимизировано для мобильных устройств с поддержкой веб
- 🛍️ **Каталог товаров** - просмотр товаров с фильтрацией и поиском
- 🛒 **Корзина покупок** - добавление/удаление товаров, изменение количества
- 👤 **Аутентификация** - регистрация и вход пользователей
- 💳 **Промо-акции** - отображение активных промо-предложений

## Требования

- Node.js 18+ 
- npm или yarn
- Запущенный бэкенд (см. [README бэкенда](../backend/README.md))

## Установка и запуск

### 1. Установка зависимостей

```bash
cd mobile-app
npm install
```

### 2. Запуск бэкенда

⚠️ **Важно**: Перед запуском мобильного приложения необходимо запустить бэкенд сервер.

Следуйте инструкциям в [README бэкенда](../backend/README.md) для запуска API:

```bash
# В папке backend
docker-compose up -d
docker-compose exec app poetry run alembic upgrade head
docker-compose exec db bash -c "psql -U postgres -d shop_db -f /data/test_data.sql"
```

Бэкенд должен быть доступен по адресу `http://localhost:8000`

### 3. Запуск мобильного приложения

```bash
npm start
```

Приложение будет доступно по адресу `http://localhost:8100`

### Создание нового пользователя

Вы можете создать новый аккаунт через форму регистрации в приложении:
1. Перейдите на вкладку "Profile" 
2. Нажмите "Sign In"
3. Переключитесь на вкладку "Register"
4. Заполните форму регистрации

## Структура проекта

```
mobile-app/
├── public/                  # Статические файлы
├── src/
│   ├── components/         # Переиспользуемые компоненты
│   ├── hooks/             # React Query хуки для API
│   ├── pages/             # Страницы приложения
│   ├── providers/         # React контексты
│   ├── services/          # API клиент и конфигурация
│   ├── theme/             # Стили и темы
│   └── types/             # TypeScript типы
├── capacitor.config.ts    # Конфигурация Capacitor
├── ionic.config.json      # Конфигурация Ionic
└── package.json          # Зависимости npm
```

## Основные страницы

- **Главная** (`/home`) - промо-акции и рекомендуемые товары
- **Товары** (`/products`) - каталог с фильтрацией и поиском
- **Товар** (`/products/:id`) - детальная страница товара
- **Корзина** (`/cart`) - управление корзиной покупок
- **Профиль** (`/profile`) - аутентификация и настройки пользователя

## API интеграция

Приложение использует следующие API эндпоинты:

- `GET /api/v1/products` - получение списка товаров
- `GET /api/v1/products/{id}` - получение товара по ID
- `GET /api/v1/categories` - получение категорий
- `GET /api/v1/promos/active` - получение активных промо
- `POST/GET /api/v1/carts/*` - управление корзиной
- `POST /api/v1/auth/login` - аутентификация
- `POST /api/v1/auth/register` - регистрация

## Docker развертывание

### Быстрый запуск всего стека

Для запуска всего приложения (бэкенд + мобильное приложение + база данных):

```bash
# Запуск всех сервисов
docker-compose up -d

# Применение миграций базы данных
docker-compose exec backend poetry run alembic upgrade head

# Загрузка тестовых данных
docker-compose exec db bash -c "psql -U postgres -d shop_db -f /data/test_data.sql"
```

После запуска будут доступны:
- **Мобильное приложение**: http://localhost:5173
- **API бэкенда**: http://localhost:8000
- **API документация**: http://localhost:8000/docs

### Только мобильное приложение

Если у вас уже запущен бэкенд, можете запустить только мобильное приложение:

```bash
# Сборка образа
docker build -t mobile-shop-app .

# Запуск контейнера
docker run -p 3000:80 mobile-shop-app
```

### Остановка сервисов

```bash
# Остановка всех сервисов
docker-compose down

# Остановка с удалением volumes (удалит базу данных)
docker-compose down -v
```

## Разработка

### Запуск в режиме разработки

```bash
npm run dev
```

### Сборка для продакшена

```bash
npm run build
```

### Проверка типов

```bash
npm run type-check
```

### Линтинг

```bash
npm run lint
```

## Мобильная разработка

### Android
```bash
# Синхронизация с проектом Android
npx cap sync android

# Открыть в Android Studio
npx cap open android
```

### iOS (требуется Xcode)
```bash
# Синхронизация с проектом iOS
npx cap sync ios

# Открыть в Xcode
npx cap open ios
```

## Технологии

- **Ionic Framework** - UI компоненты для мобильных приложений
- **React** - основной фреймворк
- **TypeScript** - статическая типизация
- **React Query** - управление состоянием и кэшированием API
- **React Router** - маршрутизация
- **Capacitor** - нативные возможности устройств
- **Axios** - HTTP клиент для API запросов

## Устранение неполадок

### Приложение не подключается к API

1. Убедитесь, что бэкенд запущен на `http://localhost:8000`
2. Проверьте настройки CORS в бэкенде (backend/app/main.py)
3. Убедитесь, что тестовые данные загружены

### Ошибки аутентификации

1. Используйте нового зарегистрированного пользователя
2. Убедитесь, что тестовые пользователи загружены в базу данных
3. Проверьте формат данных для входа (email/password)

### Проблемы с корзиной

1. Убедитесь, что вы вошли в систему
2. Проверьте, что товары имеют доступные варианты (размер/цвет)
3. Убедитесь, что у товаров есть достаточное количество на складе
