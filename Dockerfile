FROM node:16.14.2-slim

RUN usermod -u 1001 node

USER node

WORKDIR /home/node/app

CMD [ "tail", "-f", "/dev/null" ]
