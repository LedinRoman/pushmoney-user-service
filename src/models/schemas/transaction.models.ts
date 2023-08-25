/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, ObjectIdSchemaDefinition } from 'mongoose';

export interface ITransaction<T = unknown> {
  _id: T;
  amount: number;
  currency_name: string;
  transaction_type: string;
  sender_user_id?: string;
  sender_card_number?: number;
  receiver_user_id?: string;
  receiver_card_number?: number;
  status?: string;
  signature?: string;
}

export interface ITransactionDocument<T = ObjectIdSchemaDefinition> extends Document {
  _id: T;
  amount: number;
  currency_name: string;
  transaction_type: string;
  sender_user_id?: string;
  sender_card_number?: number;
  receiver_user_id?: string;
  receiver_card_number?: number;
  status?: string;
  signature?: string;
}
