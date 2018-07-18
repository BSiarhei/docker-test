FROM node:8.11.3

WORKDIR /app

ADD . /app

RUN npm install --ignore-scripts --only=production

EXPOSE 3000

CMD ["node", "index"]
