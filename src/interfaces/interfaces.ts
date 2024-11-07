import { PouchCost } from '../enums/enums';

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
  pouchSize: keyof typeof PouchCost;
}

export interface NextDeliveryMessage {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}
