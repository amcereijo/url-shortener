import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    port: parseInt(process.env.PORT, 10) || 3000,

    urlBase: process.env.BASE_URL,

    mongo: {
      dbName: process.env.MONGO_DB,
      user: process.env.MONGO_USERNAME,
      password: process.env.MONGO_PASSWORD,
      port: parseInt(process.env.MONGO_PORT, 10),
      host: process.env.MONGO_HOST,
      connection: process.env.MONGO_CONNECTION,
    },

    rabbitMQ: {
      url: `amqp://${process.env.RABBIT_USER}:${process.env.RABBIT_PASS}@${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`,
      visitUrl: {
        queue: 'visit_url_queue',
      },
    },
  };
});
