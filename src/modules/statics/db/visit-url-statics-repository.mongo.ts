import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import VisitUrlStatics from '../domain/visit-url-statics';
import { VisitUrlStaticsRepository } from '../domain/visit-url-statics.repository';
import { VisitUrlStaticsEntity } from './visit-url-statics.entity';

@Injectable()
export class VisitUrlStaticsRepositoryMongo
  implements VisitUrlStaticsRepository<VisitUrlStatics>
{
  private logger = new Logger(VisitUrlStaticsRepositoryMongo.name);

  constructor(
    @InjectModel('VisitUrlStatics')
    private readonly model: Model<VisitUrlStaticsEntity>,
  ) {}

  async incrementVisit(visitUrlStatic: VisitUrlStatics): Promise<void> {
    await this.model.findOneAndUpdate(
      {
        originalUrl: visitUrlStatic.originalUrl,
        shortToken: visitUrlStatic.shortToken,
      },
      { $inc: { visits: 1 } },
      { upsert: true },
    );
  }
}
