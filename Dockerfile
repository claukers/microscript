FROM node:14-alpine as builder

USER node

WORKDIR /home/node
RUN mkdir miqro
WORKDIR /home/node/miqro
COPY ./package*.json ./
COPY src/ src/
COPY ./tsconfig.json ./
RUN npm i
RUN npm run build
RUN npm prune --production

USER root
RUN npm install -g .

FROM node:14-alpine as app

COPY --from=builder /usr/local/lib/node_modules/miqro /usr/local/lib/node_modules/miqro
RUN ln -s /usr/local/lib/node_modules/miqro/dist/cli/cli.js /usr/local/bin/miqro

USER node

RUN mkdir /home/node/app

ENV NODE_PATH=/usr/local/lib/node_modules:/usr/local/lib/node_modules/miqro/node_modules:/home/node/app/node_modules

WORKDIR /home/node/app

CMD npx miqro start $CLUSTER_COUNT cluster /home/node/app
