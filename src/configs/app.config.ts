import { Injectable } from '@nestjs/common';
import { IAppConfig } from '../models/configs/app.models';
import { ConfigService } from './config.service';

@Injectable()
export class AppConfig implements IAppConfig {

  public readonly name: string;
  public readonly port: number;
  public readonly isProduction: boolean;

  constructor(configService: ConfigService) {
    this.name = configService.getString('APP_NAME');
    this.port = configService.getNumber('APP_PORT');
    this.isProduction = configService.getBoolean('APP_PRODUCTION');
  }

}
