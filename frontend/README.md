# Vite + React + TypeScript + Docker + Nginx

## Локальный запуск

```sh
npm ci
npm run dev
```

Открой [http://localhost:5173](http://localhost:5173) в браузере.

---

## Сборка и запуск в Docker

```sh
docker build -t online-shop-frontend .
docker run -p 8080:80 online-shop-frontend
```

Приложение будет доступно на [http://localhost:8080](http://localhost:8080)