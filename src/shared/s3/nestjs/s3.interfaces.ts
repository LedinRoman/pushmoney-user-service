import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { IS3Options } from '../client/client.models';

export interface IS3ConfigFactory {
  createS3Config(): Promise<IS3Options> | IS3Options;
}

export interface IS3AsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting: Type<IS3ConfigFactory>;
}
