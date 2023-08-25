import { Injectable } from '@nestjs/common';
import { IRabbitOptions } from '../shared/rabbit/client/rabbit.models';
import { IRabbitOptionsFactory } from '../shared/rabbit/module/rabbit.interfaces';
import { ConfigService } from './config.service';

@Injectable()
export class RabbitmqConfig implements IRabbitOptionsFactory {

  private readonly host: string;
  private readonly port: number;
  private readonly username: string;
  private readonly password: string;
  private readonly queues: { name: string }[];

  constructor(configService: ConfigService) {
    this.host = configService.getString('RABBIT_HOSTNAME');
    this.port = configService.getNumber('RABBIT_PORT');
    this.username = configService.getString('RABBIT_USERNAME');
    this.password = configService.getString('RABBIT_PASSWORD');
    this.queues = configService.getString('RABBIT_QUEUES').split(',').map((item) => ({ name: item }));
  }

  public createRabbitOptions(): IRabbitOptions {
    return {
      host: this.host,
      port: this.port,
      username: this.username,
      password: this.password,
      timeout: 10000,
      retry: 3,
      queues: this.queues ?? [],
    };
  }

}
