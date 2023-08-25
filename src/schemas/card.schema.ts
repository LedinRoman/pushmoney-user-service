import { Schema, Types } from 'mongoose';
import { ICardDocument } from '../models/schemas/card.models';
import { CardStatuses } from '../shared/enums';

export const CardSchema = new Schema<ICardDocument>(
  {
    _id: {
      type: Types.ObjectId,
      auto: false,
    },
    user_id: { type: String, ref: 'users' },
    status: { type: String, enum: CardStatuses, default: CardStatuses.pending },
    card_country: { type: String },
    card_type: { type: String },
    bank: { type: String }, // bad one
    card_number: { type: Number },
    card_exp: { type: Date },
    card_cvv: { type: Number },
    meta: Schema.Types.Mixed,
    balance: { type: Number, default: 0 },
    currency: { type: String },
    limit: { type: Number, default: null },
    removed: { type: Boolean, default: false },
    // TODO: get default URL
    design_picture: { type: String, default: 'url' },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false,
  },
);
