# Url shortener
API to handle url shortener functionality

## Description
Based on [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

Create `.env` file (`.env.test` or `.env.template` could be used as base)


## Running the app with docker
This will start the required componentes and start the app on port 80 (configued by `.env` file)

It requires to create the `.env` file.

```bash
docker-compose -f docker-compose.yml up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

***Note***  - to run e2e tests, rabbitmq is required (run `docker-compose up rabbitmq`)

### Uses cases

#### GET /status - health check
Check if the project is runing

#### POST /create - create short url
Create if no exists and return the short version for the income url

#### GET /:token - redirect to original url
Redirect to the original url linked to the "token" value

*On local machine, even when base url is set to `http://tier.app` , to test the functionality, we need to use `http://localhost` (this can be set on .env files)*
