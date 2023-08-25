import { Schema, Types } from 'mongoose';
import { IExchangeRatesDocument } from '../models/schemas/exchange-rates.models';

export const ExchangeRatesSchema = new Schema<IExchangeRatesDocument>(
  {
    _id: {
      type: Types.ObjectId,
      auto: true,
    },
    first_cur: { type: String },
    second_cur: { type: String },
    price: { type: Number },
    price_movement: {
      percentage: { type: Number },
      value: { type: Number },
      movement: { type: String },
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);
