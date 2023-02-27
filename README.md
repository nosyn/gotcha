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


### docker-compose

```
# Clean node_modules because of weird pnpm workspace with Docker
pnpm clean

# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create app_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Install dependencies
pnpm clean

# Start prod in detached mode
docker-compose -f docker-compose.dev.yml up -d
```