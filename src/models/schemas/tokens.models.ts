import { Document, ObjectIdSchemaDefinition } from 'mongoose';

export interface ITokensDocument<T = ObjectIdSchemaDefinition> extends Document {
  _id: T;
  user_id: string;
  access_token: string;
  refresh_token: string;
  created_at: Date;
  updated_at: Date;
}
