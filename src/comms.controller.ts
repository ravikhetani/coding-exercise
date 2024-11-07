import { Controller, Get } from '@nestjs/common';
import { CommsService } from './comms.service';

@Controller()
export class CommsController {
  constructor(private readonly commsService: CommsService) {}

  @Get('your-next-delivery/:userId')
  getNextDelivery(): string {
    return this.commsService.getNextDelivery();
  }
}
