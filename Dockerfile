# --- Stage 1: Build ---
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Stage 2: Production Server ---
FROM nginx:1.27-alpine

# Копируем конфиг Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# ВНИМАНИЕ: Убедись, что Vite собирает в папку 'dist' (по умолчанию) или 'build'.
# Если в Vite по умолчанию 'dist', замени /app/build на /app/dist
COPY --from=builder /app/dist /usr/share/nginx/html

# --- МАГИЯ ДИНАМИКИ ---
# Создаем скрипт в папке, которую Nginx автоматически сканирует при старте
RUN echo "#!/bin/sh" > /docker-entrypoint.d/20-env-subst.sh && \
    echo "echo \"window._env_ = { VITE_API_URL: '\$VITE_API_URL' };\" > /usr/share/nginx/html/env-config.js" >> /docker-entrypoint.d/20-env-subst.sh && \
    chmod +x /docker-entrypoint.d/20-env-subst.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]