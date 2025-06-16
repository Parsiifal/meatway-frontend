# Используем официальный образ Node.js
FROM node:18-alpine AS builder

# Рабочая директория внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Production образ
FROM node:18-alpine AS runner

WORKDIR /app

# Копируем только необходимые файлы из builder стадии
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Указываем порт, который будет использоваться приложением
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]