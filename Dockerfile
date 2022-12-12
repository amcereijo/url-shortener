FROM  node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM  node:18-alpine as production

WORKDIR /usr/src/app

COPY package*.json ./

# change to use other env file
COPY .env.test ./.env

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

EXPOSE 80

CMD ["npm", "run", "start:prod"]
