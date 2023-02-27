# Gotcha

- A scalable microservices application

### Apps and Packages

- Apps:
  - `api`: a [ExpressJS](https://expressjs.com/) & [Apollo GraphQL Server](https://www.apollographql.com/docs/apollo-server/)
    - port: 5000
  - `api`: Auth server
    - port: 5100
  - `api-storage`: a [Fastify](https://www.fastify.io/) that serves static assets
    - port: 8080
  - `web`: An User App to resolve captcha
    - port: 3000
  - `admin`: An Admin Dashboard app
    - port: 4000
  - `captcha`: An NodeJS Application that generates random captcha images
- Packages:
  - `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
  - `tsconfig`: `tsconfig.json`s used throughout the monorepo
