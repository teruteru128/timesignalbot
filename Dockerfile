FROM node:16 as base

WORKDIR /src

COPY package-lock.json .
COPY package.json .
COPY index.js .
RUN npm install
ENTRYPOINT [ "npm", "start" ]
