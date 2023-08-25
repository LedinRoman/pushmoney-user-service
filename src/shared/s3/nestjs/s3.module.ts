/* eslint-disable consistent-return */
import { DynamicModule, Global, Logger, Module, Provider } from '@nestjs/common';
import { AwsS3Client } from '../client/client';
import { IS3Options } from '../client/client.models';
import { S3Constants } from './s3.constants';
import { IS3AsyncOptions, IS3ConfigFactory } from './s3.interfaces';

@Global()
@Module({})
export class S3Module {

  static logger = new Logger('S3Module');

  public static forRoot(options: IS3Options): DynamicModule {
    const S3OptionsProvider: Provider = {
      provide: S3Constants.optionsToken,
      useValue: options,
    };

    const S3ClientProvider: Provider = {
      provide: S3Constants.clientToken,
      useFactory: () => {
        try {
          return AwsS3Client.init(options);
        }
        catch (error) {
          this.logger.warn(error);
        }
      },
    };

    const dynamicModule: DynamicModule = {
      module: S3Module,
      providers: [
        S3OptionsProvider,
        S3ClientProvider,
      ],
      exports: [
        S3ClientProvider,
      ],
    };

    return dynamicModule;
  }

  public static forRootAsync(asyncOptions: IS3AsyncOptions): DynamicModule {
    const S3OptionsProvider: Provider = {
      provide: S3Constants.optionsToken,
      useFactory(optionsFactory: IS3ConfigFactory) {
        return optionsFactory.createS3Config();
      },
      inject: [asyncOptions.useExisting],
    };

    const S3ClientProvider: Provider = {
      provide: S3Constants.clientToken,
      useFactory: (options: IS3Options) => {
        try {
          return AwsS3Client.init(options);
        }
        catch (error) {
          this.logger.warn(error);
        }
      },
      inject: [S3Constants.optionsToken],
    };

    const dynamicModule: DynamicModule = {
      module: S3Module,
      imports: asyncOptions.imports,
      providers: [
        S3OptionsProvider,
        S3ClientProvider,
      ],
      exports: [
        S3ClientProvider,
      ],
    };

    return dynamicModule;
  }

}
