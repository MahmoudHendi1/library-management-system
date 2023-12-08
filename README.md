<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A Library Management System built using
  <a href="https://github.com/nestjs/nest" target="_blank">NestJS<a> 
  and <a href="https://www.postgresql.org/" target="_blank"> PostgreSQL </a> </p>

## Description

This project is a simple library management system designed to manage books and borrowers. It allows for the addition, updating, deletion, and retrieval of book and borrower information, as well as handling the borrowing process

## Installation Using Docker

To simplify the setup process, you can use Docker and the provided docker-compose file. This will automatically configure the database, set up the necessary environment variables, and run the project.

To get started, make sure you have [Docker](https://www.docker.com/) installed on your system. Then, follow these steps:

1. Clone the project repository.
2. Navigate to the project directory in your terminal.
3. Run the following command to start the project:

```bash
$ docker-compose up
```

## Installation without Docker

After cloning the project, make sure to create a `.env` file and provide the correct information for the database connection.

```bash
$ npm install
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

## Documentation

- Full documentation of the apis are added using swgger
- Checking the apis swagger docs by running the application first then add this link into the chrome `http://localhost:3000/api`

## Database Schema

![database_schema](https://github.com/MahmoudHendi1/library-management-system/assets/51229687/74bf09b5-b443-4c4d-b852-d5896fb4088f)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
