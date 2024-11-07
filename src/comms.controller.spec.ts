import { Test, TestingModule } from '@nestjs/testing';
import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';

describe('CommsController', () => {
  let commsController: CommsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommsController],
      providers: [CommsService],
    }).compile();

    commsController = app.get<CommsController>(CommsController);
  });

  describe('/your-next-delivery', () => {
    it('should return "This is the next delivery"', () => {
      expect(commsController.getNextDelivery()).toBe(
        'This is the next delivery',
      );
    });
  });
});
