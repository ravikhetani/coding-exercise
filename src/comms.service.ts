import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cats: Cat[];
}

export interface Cat {
  name: string;
  subscriptionActive: boolean;
  breed: string;
  pouchSize: string;
}

@Injectable()
export class CommsService {
  getNextDelivery(userId: string): string {
    const userDataJsonPath = path.join(__dirname, '../../data.json');
    const users = JSON.parse(
      fs.readFileSync(userDataJsonPath, 'utf8'),
    ) as User[];

    const user: User | undefined = users.find((user) => user.id === userId);

    if (!user) {
      throw new Error('User not found');
    }

    return 'This is the next delivery';
  }
}
