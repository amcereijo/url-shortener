import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import {
  closeInMongodConnection,
  rootMongooseTestModule,
} from '../../../../test/fixtures/MongoMemoryServer';
import VisitUrlStatics from '../domain/visit-url-statics';
import { VisitUrlStaticsRepositoryMongo } from './visit-url-statics-repository.mongo';
import { VisitUrlStaticsEntity } from './visit-url-statics.entity';
import { VisitUrlStaticsSchema } from './visit-url-statics.schema';

describe('VisitUrlStaticRepository', () => {
  let visitUrlStaticRepository: VisitUrlStaticsRepositoryMongo;
  let visitUrlStaticslModel: Model<VisitUrlStaticsEntity>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: 'VisitUrlStatics', schema: VisitUrlStaticsSchema },
        ]),
      ],
      providers: [VisitUrlStaticsRepositoryMongo],
    }).compile();

    visitUrlStaticRepository = module.get<VisitUrlStaticsRepositoryMongo>(
      VisitUrlStaticsRepositoryMongo,
    );
    visitUrlStaticslModel = module.get<Model<VisitUrlStaticsEntity>>(
      'VisitUrlStaticsModel',
    );

    module.useLogger(new Logger());
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  describe('incrementVisit', () => {
    beforeAll(async () => {
      await visitUrlStaticslModel.insertMany([
        {
          originalUrl: 'http://google.es/path',
          shortToken: 'sdfdf',
          visits: 1,
        },
        { originalUrl: 'http://other.es/path', shortToken: 'sdsfd', visits: 3 },
      ]);
    });
    afterAll(async () => {
      await visitUrlStaticslModel.deleteMany({});
    });

    it('when there are available data for url, should increment "visits" value', async () => {
      await visitUrlStaticRepository.incrementVisit(
        new VisitUrlStatics('http://google.es/path', 'sdfdf'),
      );

      const updateElement = await visitUrlStaticslModel.findOne({
        originalUrl: 'http://google.es/path',
        shortToken: 'sdfdf',
      });

      expect(updateElement.visits).toBe(2);
    });

    it('when there are no available data for url, should create value', async () => {
      await visitUrlStaticRepository.incrementVisit(
        new VisitUrlStatics('http://google.es/path2', 'ssdfdf'),
      );

      const updateElement = await visitUrlStaticslModel.findOne({
        originalUrl: 'http://google.es/path2',
        shortToken: 'ssdfdf',
      });

      expect(updateElement.visits).toBe(1);
    });
  });
});
