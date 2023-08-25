import { AllowedCurrencies } from '../../shared/enums';

export interface ICreateTransactionRequest {
  amount: number;
  currency_name?: AllowedCurrencies;
  sender_card_number?: number;
  receiver_card_number?: number;
  signature?: string;
  sender_bank?: string;
}

export interface IGetTransactionsRequest {
  page: number;
  size: number;
}
