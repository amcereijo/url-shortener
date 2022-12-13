import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../../config';
import { UrlRepositoryMongo } from './db/url-repository.mongo';
import { UrlSchema } from './db/url.schema';
import { UrlMapper } from './mappers/url.mapper';
import { CreateShortController } from './uses-cases/create-short/create-short.controller';
import { CreateShortService } from './uses-cases/create-short/create-short.service';
import { RedirectOriginalController } from './uses-cases/redirect-original/redirect-original.controller';
import { RedirectOriginalService } from './uses-cases/redirect-original/redirect-original.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Url',
        schema: UrlSchema,
      },
    ]),
  ],
  providers: [
    UrlMapper,
    {
      provide: 'UrlRepository',
      useClass: UrlRepositoryMongo,
    },
    {
      provide: 'CreateShortService',
      useClass: CreateShortService,
    },
    {
      provide: 'RedirectOriginalService',
      useClass: RedirectOriginalService,
    },
    {
      provide: 'config',
      useFactory: config,
    },
    {
      provide: 'VISIT_URL_MQ_SERVICE',
      useFactory: (configService: ConfigType<typeof config>) => {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.rabbitMQ.url],
            queue: configService.rabbitMQ.visitUrl.queue,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [config.KEY],
    },
  ],
  controllers: [CreateShortController, RedirectOriginalController],
})
export class UrlModule {}
