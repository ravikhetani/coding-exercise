import { Injectable, NotFoundException } from '@nestjs/common';
import { NextDeliveryMessage, User } from './interfaces/interfaces';
import * as fs from 'fs';
import * as path from 'path';
import { PouchCost } from './enums/enums';
import { formatCatNames } from './utils';

@Injectable()
export class CommsService {
  getNextDeliveryMessage(userId: string): NextDeliveryMessage {
    const userDataJsonPath = path.join(__dirname, '../data.json');
    const users = JSON.parse(
      fs.readFileSync(userDataJsonPath, 'utf8'),
    ) as User[];

    const user: User | undefined = users.find((user) => user.id === userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const activeCats = user.cats.filter((cat) => cat.subscriptionActive);

    if (activeCats.length === 0) {
      throw new NotFoundException('No active cat subscriptions found');
    }

    const catNames = activeCats.map((cat) => cat.name);
    const formattedCatNames = formatCatNames(catNames);
    const totalPrice = activeCats.reduce(
      (total, cat) => total + PouchCost[cat.pouchSize],
      0,
    );

    return {
      title: `Your next delivery for ${formattedCatNames}`,
      message: `Hey ${user.firstName}! In two days' time, we'll be charging you for your next order for ${formattedCatNames}'s fresh food.`,
      totalPrice: totalPrice,
      freeGift: totalPrice > 120 ? true : false,
    };
  }
}
