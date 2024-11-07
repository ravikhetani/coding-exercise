import { CommsService } from './comms.service';
import * as fs from 'fs';
import { User } from './interfaces/interfaces';
import { NotFoundException } from '@nestjs/common';

jest.mock('fs');

describe('getNextDelivery', () => {
  const commsService = new CommsService();

  it('should throw an error if user ID is not found', () => {
    const userId = 'nonexistent';
    const data: User[] = [];
    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(data));

    expect(() => commsService.getNextDeliveryMessage(userId)).toThrow(
      new NotFoundException('User not found'),
    );
  });

  it('should return the next delivery message with correct price when there is only ONE Cat with an active subscription', () => {
    const userId = 'ff535484-6880-4653-b06e-89983ecf4ed6';
    const data: User[] = [
      {
        id: 'ff535484-6880-4653-b06e-89983ecf4ed6',
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.Doe@test.com',
        cats: [
          {
            name: 'Pebble',
            subscriptionActive: true,
            breed: 'Thai',
            pouchSize: 'C',
          },
        ],
      },
    ];

    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(data));

    const expectedMessage = {
      title: 'Your next delivery for Pebble',
      message:
        "Hey John! In two days' time, we'll be charging you for your next order for Pebble's fresh food.",
      totalPrice: 62.75,
      freeGift: false,
    };

    expect(commsService.getNextDeliveryMessage(userId)).toEqual(
      expectedMessage,
    );
  });

  it('should return the next delivery message with correct price when there are TWO cats with active subscriptions', () => {
    const userId = 'ff535484-6880-4653-b06e-89983ecf4ed6';
    const data: User[] = [
      {
        id: 'ff535484-6880-4653-b06e-89983ecf4ed6',
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.Doe@test.com',
        cats: [
          {
            name: 'Pebble',
            subscriptionActive: true,
            breed: 'Thai',
            pouchSize: 'F',
          },
          {
            name: 'Rubble',
            subscriptionActive: true,
            breed: 'Thai',
            pouchSize: 'D',
          },
        ],
      },
    ];

    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(data));

    const expectedMessage = {
      title: 'Your next delivery for Pebble and Rubble',
      message:
        "Hey John! In two days' time, we'll be charging you for your next order for Pebble and Rubble's fresh food.",
      totalPrice: 137.25,
      freeGift: true,
    };

    expect(commsService.getNextDeliveryMessage(userId)).toEqual(
      expectedMessage,
    );
  });

  it('should return the next delivery message with correct price when there are MULTIPLE cats with active subscriptions', () => {
    const userId = 'ff535484-6880-4653-b06e-89983ecf4ed6';
    const data: User[] = [
      {
        id: 'ff535484-6880-4653-b06e-89983ecf4ed6',
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.Doe@test.com',
        cats: [
          {
            name: 'Pebble',
            subscriptionActive: true,
            breed: 'Thai',
            pouchSize: 'B',
          },
          {
            name: 'Rubble',
            subscriptionActive: true,
            breed: 'Thai',
            pouchSize: 'A',
          },
          {
            name: 'Gravel',
            subscriptionActive: true,
            breed: 'Thai',
            pouchSize: 'A',
          },
        ],
      },
    ];

    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(data));

    const expectedMessage = {
      title: 'Your next delivery for Pebble, Rubble, and Gravel',
      message:
        "Hey John! In two days' time, we'll be charging you for your next order for Pebble, Rubble, and Gravel's fresh food.",
      totalPrice: 170.5,
      freeGift: true,
    };

    expect(commsService.getNextDeliveryMessage(userId)).toEqual(
      expectedMessage,
    );
  });

  it('should not include cats with INACTIVE subscriptions in the delivery message', () => {
    const userId = 'ff535484-6880-4653-b06e-89983ecf4ed6';
    const data: User[] = [
      {
        id: 'ff535484-6880-4653-b06e-89983ecf4ed6',
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.Doe@test.com',
        cats: [
          {
            name: 'Pebble',
            subscriptionActive: false,
            breed: 'Thai',
            pouchSize: 'B',
          },
          {
            name: 'Rubble',
            subscriptionActive: true,
            breed: 'Thai',
            pouchSize: 'A',
          },
          {
            name: 'Gravel',
            subscriptionActive: true,
            breed: 'Thai',
            pouchSize: 'D',
          },
        ],
      },
    ];

    jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(data));

    const expectedMessage = {
      title: 'Your next delivery for Rubble and Gravel',
      message:
        "Hey John! In two days' time, we'll be charging you for your next order for Rubble and Gravel's fresh food.",
      totalPrice: 121.5,
      freeGift: true,
    };

    expect(commsService.getNextDeliveryMessage(userId)).toEqual(
      expectedMessage,
    );
  });
});

it('should throw an error if there are NO cats with active subscriptions', () => {
  const commsService = new CommsService();

  const userId = 'ff535484-6880-4653-b06e-89983ecf4ed6';
  const data: User[] = [
    {
      id: 'ff535484-6880-4653-b06e-89983ecf4ed6',
      firstName: 'John',
      lastName: 'Doe',
      email: 'John.Doe@test.com',
      cats: [
        {
          name: 'Pebble',
          subscriptionActive: false,
          breed: 'Thai',
          pouchSize: 'B',
        },
        {
          name: 'Rubble',
          subscriptionActive: false,
          breed: 'Thai',
          pouchSize: 'A',
        },
        {
          name: 'Gravel',
          subscriptionActive: false,
          breed: 'Thai',
          pouchSize: 'D',
        },
      ],
    },
  ];

  jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify(data));

  expect(() => commsService.getNextDeliveryMessage(userId)).toThrow(
    new NotFoundException('No active cat subscriptions found'),
  );
});
