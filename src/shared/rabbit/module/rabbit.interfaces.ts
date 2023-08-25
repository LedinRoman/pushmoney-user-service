import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { IRabbitOptions } from '../client/index';

export interface IRabbitOptionsFactory {
  createRabbitOptions(): Promise<IRabbitOptions> | IRabbitOptions;
}

export interface IRabbitAsyncMysql extends Pick<ModuleMetadata, 'imports'> {
  name?: string;
  useExisting: Type<IRabbitOptionsFactory>;
}
