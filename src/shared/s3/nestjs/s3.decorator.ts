/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Inject } from '@nestjs/common';
import { S3Constants } from './s3.constants';

export const InjectS3 = (): ReturnType<typeof Inject> => Inject(S3Constants.clientToken);
