import { Controller, Get, Param } from '@nestjs/common';
import { CommsService } from './comms.service';
import { NextDeliveryMessage } from './interfaces/interfaces';

@Controller()
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @Get('your-next-delivery/:userId')
  getNextDelivery(@Param('userId') userId: string): NextDeliveryMessage {
    return this.commsService.getNextDeliveryMessage(userId);
  }
}
