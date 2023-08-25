import { Injectable } from '@nestjs/common';
import { IBucketData } from '../models/configs/s3.models';
import { IS3Options } from '../shared/s3/client/client.models';
import { IS3ConfigFactory } from '../shared/s3/nestjs/s3.interfaces';
import { ConfigService } from './config.service';

@Injectable()
export class S3Config implements IS3ConfigFactory {

  private readonly bucketRegion: string;
  private readonly bucketName: string;
  private readonly host: string;
  private readonly cdnHost: string;
  private readonly accessKey: string;
  private readonly secretKey: string;

  constructor(configService: ConfigService) {
    this.bucketRegion = configService.getString('S3_BUCKETREGION');
    this.bucketName = configService.getString('S3_BUCKETNAME');
    this.host = configService.getString('S3_API_HOST');
    this.accessKey = configService.getString('S3_ACCESS_KEY');
    this.secretKey = configService.getString('S3_SECRET_KEY');
    this.cdnHost = configService.getString('S3_CDN_HOST');
  }

  public createS3Config(): IS3Options {
    return {
      endPoint: this.host,
      accessKey: this.accessKey,
      secretKey: this.secretKey,
      region: this.bucketRegion,
    };
  }

  public get getBucketData(): IBucketData {
    return {
      bucketName: this.bucketName,
      bucketRegion: this.bucketRegion,
      endPoint: this.host,
      cdnHost: this.cdnHost,
    };
  }

  public makeLink(name: string): string {
    return `${this.cdnHost}/${this.bucketName}/${name}`;
  }

}
