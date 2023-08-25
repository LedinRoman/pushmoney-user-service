export enum CardStatuses {
  pending = 'pending',
  valid = 'valid',
  blocked = 'blocked',
}

export const CountryCurrency = {
  BRA: 'BRL', // Brazilia 🇧🇷
  RUS: 'RUB', // Russia
  IND: 'INR', // India 🇮🇳
  CHN: 'CNY', // China
  ZAF: 'ZAR', // South African Republic 🇿🇦
};

export enum AllowedCountries {
  BRA = 'BRA',
  RUS = 'RUS',
  IND = 'IND',
  CHN = 'CHN',
  ZAF = 'ZAF',
}

export enum AllowedCurrencies {
  BRL = 'BRL',
  RUB = 'RUB',
  INR = 'INR',
  CNY = 'CNY',
  ZAR = 'ZAR',
  DigitalRub = 'DigitalRub',
}

export enum TransactionTypes {
  depositWallet = 'depositWallet',
  depositCard = 'depositCard',
  sendToCard = 'sendToCard',
}

export enum TransactionsStatuses {
  pending = 'pending',
  success = 'success',
  cancelled = 'cancelled',
}
