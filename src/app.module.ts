import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import config from './config';
import { DatabaseModule } from './database/database.module';
import RabbitMQ from './message-broker/message-broker.rabbitmq';
import { StatusModule } from './modules/status/status.module';
import { UrlModule } from './modules/url/url.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGO_USERNAME: Joi.string().empty().optional(),
        MONGO_PASSWORD: Joi.string().empty().optional(),
        MONGO_DB: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
      }),
    }),
    StatusModule,
    DatabaseModule,
    UrlModule,
  ],
  providers: [
    {
      provide: 'MESSAGE_BROKER',
      useFactory: () => new RabbitMQ(),
    },
  ],
})
export class AppModule {}
