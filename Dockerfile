FROM node:16

ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 9000
EXPOSE 9001
ENTRYPOINT [ "yarn" ]