import { Schema, Types } from 'mongoose';
import { IUserDocument } from '../models/schemas/users.models';

export const UserSchema = new Schema<IUserDocument>({
  _id: {
    type: Types.ObjectId,
    auto: true,
  },
  full_name: String,
  full_name_low: { type: String, index: true },
  code: { type: Number, default: null },
  is_verified: { type: Boolean, default: false },
  contacts: {
    telegram: { type: String, default: '' },
    email: { type: String, default: '' },
  },
  avatar: { type: String, default: '' },
  wallet: { type: String, ref: 'wallets' },
  phone: String,
  password: String,
  birth_date: { type: Date, default: null },
  location: { type: String, default: '' },
  cards: { type: [String], ref: 'cards' },
  docs: [{
    link: { type: String },
    status: { type: String },
  }],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
});
