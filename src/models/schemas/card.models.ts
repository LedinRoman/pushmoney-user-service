/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, ObjectIdSchemaDefinition } from 'mongoose';
import { CardStatuses } from '../../shared/enums';

export interface ICard<T = unknown> {
  _id: T;
  user_id?: string;
  status?: CardStatuses;
  card_country?: string;
  card_type?: string;
  bank?: string;
  card_number?: number;
  card_exp?: Date;
  card_cvv?: number;
  balance?: number;
  currency?: string;
  limit?: number;
  removed?: boolean;
  meta?: any;
  design_picture?: string;
}

export interface ICardDocument<T = ObjectIdSchemaDefinition> extends Document {
  _id: T;
  user_id?: string;
  status?: CardStatuses;
  card_country?: string;
  card_type?: string;
  bank?: string;
  card_number?: number;
  card_exp?: Date;
  card_cvv?: number;
  balance?: number;
  currency?: string;
  limit?: number;
  removed?: boolean;
  meta?: any;
  design_picture?: string;
}
