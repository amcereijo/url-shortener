import { INestApplication } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import config from '../config';
import MessageBroker from './message-broker';

export default class RabbitMQ implements MessageBroker {
  async init(app: INestApplication): Promise<void> {
    const configService: ConfigType<typeof config> = app.get(config.KEY);

    // visit url Queue
    await app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: [configService.rabbitMQ.url],
        queue: configService.rabbitMQ.visitUrl.queue,
        queueOptions: {
          durable: true,
        },
      },
    });

    app.startAllMicroservices();
  }
}
