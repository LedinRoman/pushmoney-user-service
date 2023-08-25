import { Schema, Types } from 'mongoose';
import { ITokensDocument } from '../models/schemas/tokens.models';

export const TokenSchema = new Schema<ITokensDocument>(
  {
    _id: {
      type: Types.ObjectId,
      auto: true,
    },
    user_id: { type: String, index: true },
    access_token: { type: String },
    refresh_token: { type: String },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);
