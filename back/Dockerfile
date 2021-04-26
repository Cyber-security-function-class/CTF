FROM node:15

RUN npm install -g yarn --force

WORKDIR /app

COPY package*.json ./
RUN yarn
RUN yarn global add pm2

COPY . .

EXPOSE 7000

CMD ["yarn","pm2"]