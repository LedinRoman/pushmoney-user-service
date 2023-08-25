import { Document, ObjectIdSchemaDefinition } from 'mongoose';

interface IPriceMovement {
  percentage: number;
  value: number;
  movement: string;
}


export interface IExchangeRates<T = unknown> {
  _id: T;
  first_cur: string;
  second_cur: string;
  price: number;
  price_movement: IPriceMovement;
}

export interface IExchangeRatesDocument<T = ObjectIdSchemaDefinition> extends Document {
  _id: T;
  first_cur: string;
  second_cur: string;
  price: number;
  price_movement: IPriceMovement;
}
