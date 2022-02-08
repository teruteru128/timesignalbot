FROM node:latest

COPY package-lock.json .
COPY package.json .
COPY index.js .
RUN npm start install && npm start
