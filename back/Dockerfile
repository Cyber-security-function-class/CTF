FROM node:15

RUN npm install -g yarn --force

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn

COPY . .

EXPOSE 7000

CMD [ "yarn", "start" ]