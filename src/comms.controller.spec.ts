import { Test, TestingModule } from '@nestjs/testing';
import { CommsController } from './comms.controller';
import { CommsService } from './comms.service';
import { NextDeliveryMessage } from './interfaces/interfaces';
import { NotFoundException } from '@nestjs/common';

describe('CommsController', () => {
  let commsController: CommsController;
  let commsService: CommsService;

  beforeEach(async () => {
    const mockCommsService = {
      getNextDeliveryMessage: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommsController],
      providers: [
        {
          provide: CommsService,
          useValue: mockCommsService,
        },
      ],
    }).compile();

    commsController = app.get<CommsController>(CommsController);
    commsService = app.get<CommsService>(CommsService);
  });

  describe('/your-next-delivery', () => {
    it('should return a next delivery message', () => {
      const userId = 'ff535484-6880-4653-b06e-89983ecf4ed6';
      const nextDeliveryMessage: NextDeliveryMessage = {
        title: 'Title',
        message: `Message`,
        totalPrice: 100,
        freeGift: false,
      };

      jest
        .spyOn(commsService, 'getNextDeliveryMessage')
        .mockImplementation(() => nextDeliveryMessage);

      expect(commsController.getNextDelivery(userId)).toBe(nextDeliveryMessage);
    });
  });

  it('should correctly throw up any exceptions', () => {
    const userId = 'ff535484-6880-4653-b06e-89983ecf4ed6';
    const error = new NotFoundException('User not found');

    jest
      .spyOn(commsService, 'getNextDeliveryMessage')
      .mockImplementation(() => {
        throw error;
      });

    expect(() => commsController.getNextDelivery(userId)).toThrow(error);
  });
});
