# Alula Meteor Tracker

This is a dead-simple demo Node.js app for code excersizes.

![Screenshot](./docs/screenshot.png)

## Dependencies

- Node.js 14 or greater
- Postgres 12

## Development

1. Copy the `.env.sample` => `.env`
2. Fill out the appropriate values
3. Must have DB running to develop locally.

4. Install deps with `yarn install`

5. ```
   $ yarn start:api
   ```

   In another terminal:

   ```
   $ yarn start:app
   ```

6. Navigate to `localhost:9001` or whatever you set the `PORT` to.

### Docker Compose

Make sure to fill in the appropriate values for the `environment` keys in `docker-compose.yaml`

Run `docker compose up --build`

Navigate to the port exposed for the `app` service.

## Deployment

This application is meant to be deployed as a container, with a slight exception to the norm - both the API and UI can be run out of a single image.

Reference the included `docker-compose.yaml` for a working example, however if you _just_ want to run it out of docker, you can run the following commands.

1. Pull the image:

   ```
   $ docker pull aluladevops/meteor-tracker:latest
   ```

1. Create a network:

   ```
   $ docker network create mtnet
   ```

1. Run a postgres instance:

   ```
   $ docker run -it --name postgres \
      --env POSTGRES_USER=mtapp \
      --env POSTGRES_PASSWORD=test123 \
      --network mtnet \
      postgres
   ```

1. Run the API:

   ```
   $ docker run --rm -it \
    --name mt_api \
    --network mtnet \
    --env API_PORT=9001 \
    --env DATABASE_URL=postgresql://mtapp:test123@postgres:5432/mtapp\?schema=public \
    aluladevops/meteor-tracker \
    start:api
   ```

1. Run the App:

   ```
   $ docker run --rm -it \
    --name mt_app \
    --network mtnet \
    --env PORT=9000 \
    --env API_URL=http://mt_api:9001 \
    -p 9000:9000 \
    aluladevops/meteor-tracker \
    start:app
   ```
