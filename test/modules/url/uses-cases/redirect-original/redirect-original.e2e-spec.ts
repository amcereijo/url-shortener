import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import supertest, * as request from 'supertest';
import { configure } from '../../../../../src/app.configure';
import { UrlEntity } from '../../../../../src/modules/url/db/url.entity';
import { AppTestingModule } from '../../../../app-test.module';

describe('Module url/redirect-original (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppTestingModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    await configure(app);

    await app.init();
  });

  describe('/:token (GET)', () => {
    let response: supertest.Response;

    describe('for an non existing token', () => {
      beforeAll(async () => {
        response = await request(app.getHttpServer()).get('/sjklsjfd');
      });

      it('should return http code 404', () => {
        expect(response.statusCode).toBe(404);
      });
    });

    describe('for a valid token', () => {
      let urlModel: Model<UrlEntity>;
      const originalUrl = 'http://www.test.com/path';
      const shortToken = 'asfksjfd';

      beforeAll(async () => {
        urlModel = app.get<Model<UrlEntity>>('UrlModel');

        await urlModel.create({
          originalUrl,
          shortToken,
        });

        response = await request(app.getHttpServer()).get(`/${shortToken}`);
      });
      afterAll(async () => {
        await urlModel.deleteMany({});
      });

      it('should return http code 302', () => {
        expect(response.statusCode).toBe(302);
      });
    });
  });
});
