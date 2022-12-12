# Url shortner
API to handle url shortner functionality

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

### Uses cases

#### POST /create - create short url
ToDo

#### get /:token - redirect to original url
ToDo
