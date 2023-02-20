# Gotcha

- A scalable microservices application

### Apps and Packages

- Apps:
  - `api`: a [ExpressJS](https://expressjs.com/) & [Apollo Server]() GraphQL Server
  - `api-storage`: a [Fastify](https://www.fastify.io/) that serves static assets
  - `web`: An User App to resolve captcha
  - `admin`: An Admin Dashboard app
  - `captcha`: An NodeJS Application that generates random captcha images
- Packages:
  - `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
  - `tsconfig`: `tsconfig.json`s used throughout the monorepo
