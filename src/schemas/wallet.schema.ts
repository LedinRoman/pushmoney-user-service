import { Schema, Types } from 'mongoose';
import { IWalletDocument } from '../models/schemas/wallet.models';

export const WalletSchema = new Schema<IWalletDocument>(
  {
    _id: {
      type: Types.ObjectId,
      auto: false,
    },
    balance: { type: Number, default: 0 },
    user_id: { type: String, ref: 'users' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);
