/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, ObjectIdSchemaDefinition } from 'mongoose';

export interface IWallet<T = unknown> {
  _id: T;
  balance: number;
  user_id: string
}

export interface IWalletDocument<T = ObjectIdSchemaDefinition> extends Document {
  _id: T;
  balance?: number;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}
