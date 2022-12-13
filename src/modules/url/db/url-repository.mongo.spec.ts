import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../../test/fixtures/MongoMemoryServer';
import config from '../../../config';
import Url from '../domain/url';
import { UrlMapper } from '../mappers/url.mapper';
import { UrlRepositoryMongo } from './url-repository.mongo';
import { UrlEntity } from './url.entity';
import { UrlSchema } from './url.schema';

describe('UrlRepository', () => {
  let urlRepository: UrlRepositoryMongo;
  let urlModel: Model<UrlEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'Url', schema: UrlSchema }]),
      ],
      providers: [
        UrlRepositoryMongo,
        {
          provide: 'config',
          useFactory: config,
        },
        UrlMapper,
      ],
    }).compile();

    urlRepository = module.get<UrlRepositoryMongo>(UrlRepositoryMongo);
    urlModel = module.get<Model<UrlEntity>>('UrlModel');

    module.useLogger(new Logger());
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  describe('findByOriginalUrl', () => {
    beforeAll(async () => {
      await urlModel.insertMany([
        { originalUrl: 'http://google.es/path', shortToken: 'sdfdf' },
        { originalUrl: 'http://other.es/path', shortToken: 'sdsfd' },
      ]);
    });
    afterAll(async () => {
      await urlModel.deleteMany({});
    });

    it('when there are available data for url, should return correct data', async () => {
      const element = await urlRepository.findByOriginalUrl(
        'http://other.es/path',
      );

      expect(element.originalUrl).toBe('http://other.es/path');
      expect(element.getShortToken()).toBe('sdsfd');
    });

    it('when there are available data for url, should retur null', async () => {
      const element = await urlRepository.findByOriginalUrl(
        'http://other.es/patsadsdsh',
      );

      expect(element).toBeNull();
    });
  });

  describe('"insert" method', () => {
    beforeAll(async () => {
      await urlRepository.insert(new Url('http://google.es/path', 'sdfdf'));
    });
    afterAll(async () => {
      await urlModel.deleteMany({});
    });

    it('should insert correct data in db', async () => {
      const urlEntity = await urlModel.findOne({
        originalUrl: 'http://google.es/path',
      });

      expect(urlEntity.originalUrl).toBe('http://google.es/path');
      expect(urlEntity.shortToken).toBe('sdfdf');
    });
  });

  describe('findByShortToken', () => {
    beforeAll(async () => {
      await urlModel.insertMany([
        { originalUrl: 'http://google.es/path', shortToken: 'sdfdf' },
        { originalUrl: 'http://other.es/path', shortToken: 'sdsfd' },
      ]);
    });
    afterAll(async () => {
      await urlModel.deleteMany({});
    });

    it('when there are available data for url, should return correct data', async () => {
      const element = await urlRepository.findByShortToken('sdsfd');

      expect(element.originalUrl).toBe('http://other.es/path');
      expect(element.getShortToken()).toBe('sdsfd');
    });

    it('when there are available data for url, should retur null', async () => {
      const element = await urlRepository.findByShortToken('patsadsdsh');

      expect(element).toBeNull();
    });
  });
});
