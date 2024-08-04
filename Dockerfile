FROM node:18

WORKDIR /usr/src

COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

COPY . .

EXPOSE 4567

CMD [ "npm", "start" ]