export interface ITokensResponse {
  access_token: string;
  refresh_token: string;
}

export interface IGetResponse<T = unknown> {
  data: T[];
  count: number;
}
