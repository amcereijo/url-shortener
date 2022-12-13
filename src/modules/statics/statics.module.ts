import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitUrlStaticsRepositoryMongo } from './db/visit-url-statics-repository.mongo';
import { VisitUrlStaticsSchema } from './db/visit-url-statics.schema';
import { VisitUrlService } from './uses-cases/visit-url/visit-url-event.service';
import { VisitUrleventHandler } from './uses-cases/visit-url/visit-url.event-handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'VisitUrlStatics',
        schema: VisitUrlStaticsSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: 'VisitUrlStaticsRepository',
      useClass: VisitUrlStaticsRepositoryMongo,
    },
    {
      provide: 'VisitUrlService',
      useClass: VisitUrlService,
    },
  ],
  controllers: [VisitUrleventHandler],
})
export class StaticsModule {}
