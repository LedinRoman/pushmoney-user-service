import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { RabbitClient } from '../client/rabbit.client';
import { IRabbitOptions } from '../client/rabbit.models';
import { RabbitToken } from './rabbit.constants';
import { IRabbitAsyncMysql, IRabbitOptionsFactory } from './rabbit.interfaces';

@Global()
@Module({})
export class RabbitModule {

  public static forRootAsync(asyncOptions: IRabbitAsyncMysql): DynamicModule {
    /**
         * Формируем настройки
         */
    const RabbitClientOptionsProvider: Provider = {
      provide: RabbitToken.options,
      useFactory: (optionsFactory: IRabbitOptionsFactory) => optionsFactory.createRabbitOptions(),
      inject: [asyncOptions.useExisting],
    };


    /**
         * Создаем клиент
         */
    const RabbitMysqlProvider: Provider = {
      provide: RabbitToken.client,
      useFactory: async(options: IRabbitOptions): Promise<RabbitClient> => {
        const client = new RabbitClient(options);
        await client.connect();
        return client;
      },
      inject: [RabbitToken.options],
    };


    /**
         * Формируем модуль
         */
    const dynamicModule: DynamicModule = {
      module: RabbitModule,
      imports: asyncOptions.imports,
      providers: [
        RabbitClientOptionsProvider,
        RabbitMysqlProvider,
      ],
      exports: [
        RabbitMysqlProvider,
      ],
    };

    return dynamicModule;
  }

}
