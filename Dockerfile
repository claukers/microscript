FROM node:14-alpine

RUN npm install -g miqro

USER node

RUN mkdir /home/node/app

ENV NODE_PATH=/usr/local/lib/node_modules:/usr/local/lib/node_modules/miqro/node_modules:/home/node/app/node_modules

CMD npx miqro start $CLUSTER_COUNT cluster /home/node/app
