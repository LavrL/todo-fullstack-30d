FROM node:20-alpine

WORKDIR /app

# Копируем всё, чтобы поставить dev-зависимости
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
