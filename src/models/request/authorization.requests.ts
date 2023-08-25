export interface ILoginRequest {
  phone: string;
  password: string;
}

export interface IRefreshRequest {
  refreshToken: string;
}

export interface IRestoreRequest {
  phone: string;
  code: number;
  password: string;
}
