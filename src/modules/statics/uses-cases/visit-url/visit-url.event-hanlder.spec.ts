import { Test, TestingModule } from '@nestjs/testing';
import { VisitUrleventHandler } from './visit-url.event-handler';

describe('VisitUrleventHandler', () => {
  let controller: VisitUrleventHandler;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VisitUrleventHandler],
    }).compile();

    controller = module.get<VisitUrleventHandler>(VisitUrleventHandler);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
