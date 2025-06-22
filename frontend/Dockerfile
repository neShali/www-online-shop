# 1. Сборка (build stage)
FROM node:20-alpine AS builder

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# 2. Статический сервер через nginx
FROM nginx:1.27-alpine

# Копируем наш билд в дефолтную директорию nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Добавляем кастомный nginx конфиг
COPY nginx.conf /etc/nginx/nginx.conf

# Открываем порт
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
