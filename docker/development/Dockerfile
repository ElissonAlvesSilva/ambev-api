FROM node:8.11.4-alpine

ENV CODE /usr/src/app

RUN \
  apk add --update --no-cache git \
  && npm install -g nodemon \
  && npm install -g autocannon


RUN apk --no-cache add python build-base

RUN mkdir -p $CODE

WORKDIR $CODE