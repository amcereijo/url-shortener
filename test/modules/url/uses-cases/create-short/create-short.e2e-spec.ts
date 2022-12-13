import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { LeanDocument, Model } from 'mongoose';
import supertest, * as request from 'supertest';
import { configure } from '../../../../../src/app.configure';
import { UrlEntity } from '../../../../../src/modules/url/db/url.entity';
import { AppTestingModule } from '../../../../app-test.module';

describe('Module url/create-short (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    configure(app);

    await app.init();
  });

  describe('/create (POST)', () => {
    let response: supertest.Response;

    describe('for an invalid url', () => {
      beforeAll(async () => {
        response = await request(app.getHttpServer()).post('/create').send({
          url: '',
        });
      });

      it('should return http code 400', () => {
        expect(response.statusCode).toBe(400);
      });
    });

    describe('for a valid url', () => {
      let urlModel: Model<UrlEntity>;
      let result: LeanDocument<UrlEntity>;
      const url = 'http://www.test.com/path';

      beforeAll(async () => {
        urlModel = app.get<Model<UrlEntity>>('UrlModel');

        response = await request(app.getHttpServer()).post('/create').send({
          url,
        });

        result = await urlModel
          .findOne({
            originalUrl: url,
          })
          .lean();
      });
      afterAll(async () => {
        await urlModel.deleteMany({});
      });

      it('should return http code 200', () => {
        expect(response.statusCode).toBe(200);
      });

      it('should response correct data', () => {
        expect(response.body.shortUrl).toBe(
          `http://tier.app/${result.shortToken}`,
        );
      });

      it('should insert data in db', () => {
        expect(result.shortToken).toBeDefined();
      });
    });

    describe('for an existing url', () => {
      let urlModel: Model<UrlEntity>;
      const originalUrl = 'http://www.test.com/path';
      const shortToken = 'asfksjfd';

      beforeAll(async () => {
        urlModel = app.get<Model<UrlEntity>>('UrlModel');

        await urlModel.create({
          originalUrl,
          shortToken,
        });

        response = await request(app.getHttpServer()).post('/create').send({
          url: originalUrl,
        });
      });
      afterAll(async () => {
        await urlModel.deleteMany({});
      });

      it('should return http code 200', () => {
        expect(response.statusCode).toBe(200);
      });

      it('should response correct data', () => {
        expect(response.body.shortUrl).toBe(`http://tier.app/${shortToken}`);
      });

      it('should not insert more data in db', async () => {
        const count = await urlModel.count({
          originalUrl,
        });
        expect(count).toBe(1);
      });
    });
  });
});
