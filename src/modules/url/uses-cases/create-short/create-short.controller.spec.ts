import { Test, TestingModule } from '@nestjs/testing';
import config from '../../../../config';
import { UrlMapper } from '../../mappers/url.mapper';
import { CreateShortController } from './create-short.controller';

describe('CreateShortController', () => {
  let controller: CreateShortController;
  const CreateShortServiceMock = {
    execute: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateShortController],
      providers: [
        {
          provide: 'CreateShortService',
          useValue: CreateShortServiceMock,
        },
        {
          provide: 'config',
          useFactory: config,
        },
        UrlMapper,
      ],
    }).compile();

    controller = module.get<CreateShortController>(CreateShortController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
