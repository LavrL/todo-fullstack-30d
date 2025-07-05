FROM node:20-alpine

# Указываем development-режим
ENV NODE_ENV=development

WORKDIR /app

# Копируем зависимости и ставим всё (включая devDependencies)
COPY package*.json ./
RUN npm install

# Копируем остальной код
COPY . .

EXPOSE 4000

CMD ["npx", "nodemon", "src/index.ts"]
