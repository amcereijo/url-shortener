import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from '../../config';
import { UrlRepositoryMongo } from './db/url-repository.mongo';
import { UrlSchema } from './db/url.schema';
import { UrlMapper } from './mappers/url.mapper';
import { CreateShortController } from './uses-cases/create-short/create-short.controller';
import { CreateShortService } from './uses-cases/create-short/create-short.service';
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
      provide: 'config',
      useFactory: config,
    },
  ],
  controllers: [CreateShortController],
})
export class CreateShortModule {}
