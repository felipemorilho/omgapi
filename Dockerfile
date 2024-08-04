FROM node:20

WORKDIR /usr/src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4567

CMD [ "npm", "start" ]