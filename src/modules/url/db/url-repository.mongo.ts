import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Url from '../domain/url';
import { UrlRepository } from '../domain/url.repository';
import { UrlMapper } from '../mappers/url.mapper';
import { UrlEntity } from './url.entity';

@Injectable()
export class UrlRepositoryMongo implements UrlRepository<Url> {
  private logger = new Logger(UrlRepositoryMongo.name);

  constructor(
    @InjectModel('Url')
    private readonly urlModel: Model<UrlEntity>,
    private readonly mapper: UrlMapper,
  ) {}

  async findByOriginalUrl(originalUrl: string): Promise<Url> {
    const urlEntity = await this.urlModel.findOne({
      originalUrl,
    });

    this.logger.warn(`findByOriginalUrl for ${originalUrl}: ${urlEntity}`);

    if (urlEntity) {
      return this.mapper.fromEntityToDomain(urlEntity);
    }

    return null;
  }

  async insert(urlData: Url): Promise<Url> {
    const urlEntity = await this.urlModel.create(urlData);

    this.logger.warn(`insertred new url with ${urlData}`);

    return this.mapper.fromEntityToDomain(urlEntity);
  }
}
