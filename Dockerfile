FROM node:18.14-alpine3.17

EXPOSE 4000

WORKDIR /usr/app

COPY package*.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "start"]