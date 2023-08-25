import { Injectable } from '@nestjs/common';
import { IAuthConfig } from '../models/configs/auth.models';
import { ConfigService } from './config.service';

@Injectable()
export class AuthConfig implements IAuthConfig {

  public readonly accessSecret: string;
  public readonly accesssExpire: string;
  public readonly refreshSecret: string;
  public readonly refreshExpire: string;
  public readonly salt: string;

  constructor(configService: ConfigService) {
    this.accessSecret = configService.getString('AUTH_ACCESS_SECRET');
    this.refreshSecret = configService.getString('AUTH_REFRESH_SECRET');
    this.accesssExpire = configService.getString('AUTH_ACCESS_EXPIRE');
    this.refreshExpire = configService.getString('AUTH_REFRESH_EXPIRE');
    this.salt = configService.getString('AUTH_SALT');
  }

}
