<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Sections

- [Sections](#sections)
  - [1. Description](#1-description)
  - [2. Tecnologies 💻](#2-tecnologies-)
  - [3. Configurations ⚙️](#3-configurations-️)
  - [4. Installation](#4-installation)
  - [5. Running the migrations](#5-running-the-migrations)
  - [6. Running the app](#6-running-the-app)
  - [7. Test](#7-test)
  - [Controllers](#controllers)
  - [Mobile Application](#mobile-application)
  - [8. Stay in touch](#8-stay-in-touch)
  - [9. License](#9-license)

## 1. Description

This is a project made with NestJS for food delivery, is a simple portifoil project, you can use it if you want, but I have no intention of profiting from it.

Basicaly you can open the local url in your browser and put `/graphql` in the end of url, like this: `localhost:3333/graphql`. The **Playground** will automatically open and you can test the server how you want.

At the playground, you can see the `Docs` and the `Schemas` of the project, to use all of the queries you need to be logged, so you can send a HTTP `POST` request with your HTTP client (like postman or insomnia) to `https://localhost:YOUR_PORT_SERVER/users`, including your data, like this:

```json
{
  "name": "John Doe",
  "email": "johndoe@gmail.com",
  "password": "123456",
  "cel": "(12) 12345-6789"
}
```

And after you can send a `POST` request to `https://localhost:YOUR_PORT_SERVER/auth/login`, with your login credentials, like this:

```json
{
  "email": "johndoe@gmail.com",
  "password": "123456",
}
```

Nice!!! Now you receive the token returned from the server, you can copy and add it to your `Graphql Playground` HEADERS:

```json
{
  "Authorization": "Bearer YOUR_ACCESS_TOKEN_HERE",
}
```

And done, you are ready to use the `Graphql Playground` 👏🎉🎉🎉!!

## 2. Tecnologies 💻

- [NestJs](http://nestjs.com/)
- [Graphql](https://graphql.org/)
- [Prisma](https://www.prisma.io/docs)
- [PostgreSQL](https://www.postgresql.org)
- [AWS S3](https://aws.amazon.com/s3/)

## 3. Configurations ⚙️

First you need to configure the environment variables, to do that, use the following commands

```bash
$ cp .env.example .env
```

After doing that you need to fill the environment variables with your desired values, just open the .env file and then configure.

## 4. Installation

```bash
$ npm install
```

## 5. Running the migrations

```bash
# production mode
$ npx prisma migrate deploy

# development mode
$ npx prisma migrate dev
```

## 6. Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## 7. Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Controllers
There are some controllers and routes using the REST API to send files, these routes are:

```sh
# Send file to food entity (id: id of the food)
/foods/:id

# Send file to restaurant entity (id: id of the restaurant)
/restaurants/:id
```

WARNING: YOU NEED TO SEND THE FILE INTO THE MULTIPARTFORM DATA, DO NOT DO THIS WITH GRAPHQL

## Mobile Application
If you don`t understand this readme, you can download the Mobile Application and then use it as you want. This backend application was created for this purpose, to be used by the Mobile Application 😀.

## 8. Stay in touch

- Author - [João Vitório](https://github.com/jaovito)

## 9. License

Nest is [MIT licensed](LICENSE).
