import exp from 'constants';
import { CommsService, User } from './comms.service';
import * as fs from 'fs';

jest.mock('fs');

describe('getNextDelivery', () => {
  const commsService = new CommsService();

  it('should throw an error if user ID is not found', () => {
    const userId = 'nonexistent';
    const data: User[] = [];
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(data));

    expect(() => commsService.getNextDelivery(userId)).toThrow(
      new Error('User not found'),
    );
  });
});
