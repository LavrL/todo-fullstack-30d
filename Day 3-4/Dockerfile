version: '3.8'

services:
  backend:
    build: ./todo-backend
    container_name: todo-backend
    ports:
      - "4000:4000"
    env_file:
      - ./todo-backend/.env
    volumes:
      - ./todo-backend:/app
    restart: unless-stopped

  frontend:
    build: ./todo-next-app
    container_name: todo-frontend
    ports:
      - "3000:3000"
    env_file:
      - ./todo-next-app/.env.local
    volumes:
      - ./todo-next-app:/app
    restart: unless-stopped
    depends_on:
      - backend
