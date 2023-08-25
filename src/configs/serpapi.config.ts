import { Injectable } from '@nestjs/common';
import { ISerpapiConfig } from '../models/configs/serpapi.models';
import { ConfigService } from './config.service';

@Injectable()
export class SerpapiConfig implements ISerpapiConfig {

  public readonly apiKey: string;

  constructor(configService: ConfigService) {
    this.apiKey = configService.getString('SERPAPI_API_KEY');
  }

}
