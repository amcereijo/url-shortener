import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import config from '../../../../config';
import constants from '../../../shared/constants';
import { VisitUrlDto } from '../../../shared/dto/visit-url.dto';
import Url from '../../domain/url';
import { UrlRepository } from '../../domain/url.repository';
import { UrlMapper } from '../../mappers/url.mapper';
import { RedirectOriginallDto } from './redirect-original.dto';
import { RedirectOriginalService } from './redirect-original.service';

describe('RedirectOriginalService', () => {
  let service: RedirectOriginalService;

  const findByShortTokenMock = jest.fn();
  const urlRepositoryMock: UrlRepository<Url> = {
    findByOriginalUrl: jest.fn(),
    insert: jest.fn(),
    findByShortToken: findByShortTokenMock,
  };

  const mqClientMock = {
    emit: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'UrlRepository',
          useValue: urlRepositoryMock,
        },
        RedirectOriginalService,
        {
          provide: 'config',
          useFactory: config,
        },
        UrlMapper,
        {
          provide: 'VISIT_URL_MQ_SERVICE',
          useValue: mqClientMock,
        },
      ],
    }).compile();
    module.useLogger(new Logger());

    service = module.get<RedirectOriginalService>(RedirectOriginalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('"execute" method', () => {
    describe('when url exists on database for the url', () => {
      const existingUrl = new Url('http://google.com', 'toke');
      let originalUrl: string;

      beforeAll(async () => {
        findByShortTokenMock.mockResolvedValue(existingUrl);

        originalUrl = await service.execute(new RedirectOriginallDto('token'));
      });
      afterAll(async () => {
        findByShortTokenMock.mockClear();
      });

      it('should return the same short value', () => {
        expect(originalUrl).toBe(existingUrl.originalUrl);
      });

      it('should emit visit url event', () => {
        expect(mqClientMock.emit).toHaveBeenCalledWith(
          constants.VISIT_URL_EVENT,
          new VisitUrlDto(existingUrl.originalUrl, existingUrl.getShortToken()),
        );
      });
    });

    describe('when url does not exist on database for the url', () => {
      const redirectOriginall = new RedirectOriginallDto('token');
      let originalUrl: string;

      beforeAll(async () => {
        findByShortTokenMock.mockResolvedValue(null);

        originalUrl = await service.execute(redirectOriginall);
      });
      afterAll(() => {
        findByShortTokenMock.mockClear();
      });

      it('should return a null', () => {
        expect(originalUrl).toBeNull();
      });
    });
  });
});
