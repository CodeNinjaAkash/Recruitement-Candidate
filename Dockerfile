# syntax=docker/dockerfile:1.4

FROM node:18.12.1-alpine AS base
RUN apk add --no-cache curl git
RUN npm i -g yarn --force
WORKDIR /app

FROM base AS node_modules
COPY ./ac-recruitment-candidate/package.json /app/package.json
COPY ./ac-recruitment-candidate/yarn.lock /app/yarn.lock
RUN yarn install
# --production=true required dev dependuncies for building

FROM base as build
COPY --from=node_modules /app/node_modules /app/node_modules
COPY ./ac-recruitment-candidate/. .
COPY ./ac-recruitment/.env.candidate .env
RUN yarn build --prd

FROM nginx:1.22.1-alpine
COPY --from=build app/build /usr/share/nginx/html

# COPY robots.txt /usr/share/nginx/html/robots.txt
COPY ./ac-recruitment/nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
