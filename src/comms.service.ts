import { Injectable } from '@nestjs/common';

@Injectable()
export class CommsService {
  getNextDelivery(): string {
    return 'This is the next delivery';
  }
}
