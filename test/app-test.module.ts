import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import config from '../src/config';
import { rootMongooseTestModule } from './fixtures/MongoMemoryServer';
import { StatusModule } from '../src/modules/status/status.module';
import { CreateShortModule } from '../src/modules/url/create-short.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.test',
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
    rootMongooseTestModule(),
    StatusModule,
    CreateShortModule,
  ],
})
export class AppTestingModule {}
