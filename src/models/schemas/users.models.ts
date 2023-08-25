/* eslint-disable @typescript-eslint/no-explicit-any */
import { Document, ObjectIdSchemaDefinition } from 'mongoose';

interface IContacts {
  telegram?: string;
  email?: string;
}

interface IDocs {
  link: string;
  status: string;
}

export interface IUser<T = unknown> {
  _id: T;
  full_name?: string;
  full_name_low?: string;
  is_verified?: boolean;
  code?: number;
  contacts?: IContacts;
  avatar?: string;
  wallet: string;
  cards?: string[];
  phone?: string;
  password?: string;
  birth_date?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface IUserDocument<T = ObjectIdSchemaDefinition> extends Document {
  _id: T;
  full_name?: string;
  full_name_low?: string;
  is_verified?: boolean;
  code?: number;
  contacts?: IContacts;
  avatar?: string;
  wallet: string;
  cards?: string[];
  phone?: string;
  password?: string;
  location?: string;
  birth_date?: Date;
  docs?: IDocs[];
  created_at?: Date;
  updated_at?: Date;
}
