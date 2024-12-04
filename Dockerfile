FROM node:20-alpine

RUN apk add --no-cache tzdata
ENV TZ Asia/Tehran

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY package.json ./

RUN npm install

COPY . .

ENV NODE_ENV develop

RUN npm run build

EXPOSE 4000

CMD ["node", "dist/main.js"]
