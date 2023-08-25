export interface IUpdateProfileRequest {
  phone?: string;
  password?: string;
  full_name?: string;
  telegram?: string;
  email?: string;
  birth_date?: string;
  location?: string;
}

export interface IVerifyCodeRequset {
  code: number;
}

export interface IDepositRequest {
  amount: number;
}
