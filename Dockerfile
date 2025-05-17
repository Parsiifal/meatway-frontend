# Используем официальный образ Node.js
FROM node:18-alpine

# Рабочая директория
WORKDIR /app

# Копируем зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN npm run build

# Экспортируем порт (по умолчанию Next.js использует 3000)
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]