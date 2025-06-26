
# Многоэтапная сборка для оптимизации размера образа
FROM node:18-alpine AS build

# Установка рабочей директории
WORKDIR /app

# Копирование файлов зависимостей
COPY package*.json ./

# Установка всех зависимостей (включая dev для сборки)
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка приложения для продакшена
RUN npm run build

# Этап продакшена - используем nginx для раздачи статических файлов
FROM nginx:alpine

# Удаляем дефолтную страницу nginx
RUN rm -rf /usr/share/nginx/html/*

# Копируем собранное приложение из этапа сборки
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем кастомную конфигурацию nginx для SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]