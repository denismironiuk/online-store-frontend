# --- Stage 1: Build ---
# Используем Node 24 (Active LTS в 2026 году)
FROM node:24-alpine AS builder

WORKDIR /app

# Оптимизация кеша: копируем package.json отдельно
COPY package*.json ./

# 'npm ci' быстрее и надежнее чем 'npm install' для CI/CD
RUN npm ci

COPY . .

# Собираем Vite проект
RUN npm run build

# --- Stage 2: Production Server ---
# Используем Nginx 1.27 на базе Alpine Linux
FROM nginx:1.27-alpine

# Копируем наш конфиг (убедись, что создал nginx.conf, код ниже)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем билд из первого стейджа
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]