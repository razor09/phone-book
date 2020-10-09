FROM node:lts-alpine

WORKDIR /usr/src/app
COPY . .

RUN npm run update
RUN npm run prod

CMD npm run launch