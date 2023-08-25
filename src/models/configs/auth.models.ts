export interface IAuthConfig {
  accessSecret: string;
  accesssExpire: string;
  refreshSecret: string;
  refreshExpire: string;
  salt: string;
}
