import { Test, TestingModule } from '@nestjs/testing';
import { CreateShortService } from './create-short.service';
import { CreateShortUrlDto } from './create-short.dto';
import { Logger } from '@nestjs/common';
import { UrlRepository } from '../../domain/url.repository';
import Url from '../../domain/url';
import config from '../../../../config';
import { UrlMapper } from '../../mappers/url.mapper';

describe('CreateShortService', () => {
  let service: CreateShortService;

  const findByOriginalUrlMock = jest.fn();
  const insertMock = jest.fn();
  const urlRepositoryMock: UrlRepository<Url> = {
    findByOriginalUrl: findByOriginalUrlMock,
    insert: insertMock,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'UrlRepository',
          useValue: urlRepositoryMock,
        },
        CreateShortService,
        {
          provide: 'config',
          useFactory: config,
        },
        UrlMapper,
      ],
    }).compile();
    module.useLogger(new Logger());

    service = module.get<CreateShortService>(CreateShortService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('"create" method', () => {
    describe('when url exists on database for the url', () => {
      const existingUrl = new Url('http://google.com', 'toke');
      let createShortResult: CreateShortUrlDto;

      beforeAll(async () => {
        findByOriginalUrlMock.mockResolvedValue(existingUrl);

        createShortResult = await service.execute(
          new CreateShortUrlDto('http://google.com'),
        );
      });
      afterAll(async () => {
        findByOriginalUrlMock.mockClear();
      });

      it('should return the same short value', () => {
        expect(createShortResult.originalUrl).toBe(existingUrl.originalUrl);
        expect(createShortResult.shortToken).toBe(existingUrl.getShortToken());
      });
    });

    describe('when url does not exist on database for the url', () => {
      let createShortResult = new CreateShortUrlDto('http://googe.com');

      beforeAll(async () => {
        findByOriginalUrlMock.mockResolvedValue(null);
        insertMock.mockResolvedValue((data) => data);

        createShortResult = await service.execute(createShortResult);
      });
      afterAll(() => {
        findByOriginalUrlMock.mockClear();
        insertMock.mockClear();
      });

      it('should return a new short value', () => {
        expect(createShortResult.shortToken).toBeDefined();
      });

      it('should call to save data on database', () => {
        expect(insertMock).toHaveBeenCalled();
      });
    });
  });
});
