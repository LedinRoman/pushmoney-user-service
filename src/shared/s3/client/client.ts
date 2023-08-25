import AWS from 'aws-sdk';
import { IS3Options } from './client.models';

export class AwsS3Client {

  public static init(options: IS3Options): AWS.S3 {
    AWS.config.update({ credentials: { accessKeyId: options.accessKey, secretAccessKey: options.secretKey } });
    const s3 = new AWS.S3();
    return s3;
  }

  private accessKeyId: string;
  private secretAccessKey: string;
  private region: string;
  private endpoint: string;

  constructor(props: IS3Options) {
    this.accessKeyId = props.accessKey;
    this.secretAccessKey = props.secretKey;
    this.region = props.region;
    this.endpoint = props.endPoint;
  }

  returnData(): object {
    return {
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      region: this.region,
      endpoint: this.endpoint,
    };
  }


}
