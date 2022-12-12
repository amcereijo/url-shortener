import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';

describe('StatusController', () => {
  let statusController: StatusController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [],
    }).compile();

    statusController = app.get<StatusController>(StatusController);
  });

  describe('/status', () => {
    it('should return correct message', () => {
      expect(JSON.stringify(statusController.getStatus())).toBe(
        JSON.stringify({ status: 'OK' }),
      );
    });
  });
});
