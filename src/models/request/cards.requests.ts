import { AllowedCountries } from '../../shared/enums';

export interface IRequestCardRequest {
  card_country: AllowedCountries;
  card_type: string;
  bank: string;
  design_picture?: string;
  meta?: unknown;
}

export interface IUpdateCardRequest {
  block?: boolean;
  limit?: number;
  design_picture?: string;
}

export interface ICardIdRequest {
  cardId: string;
}
