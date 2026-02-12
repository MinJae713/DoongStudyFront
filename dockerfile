FROM node:latest

WORKDIR /frontend

COPY package*.json .

ADD . .

RUN npm install

EXPOSE 5173