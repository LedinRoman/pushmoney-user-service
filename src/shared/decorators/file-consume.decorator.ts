/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiBody } from '@nestjs/swagger';

export const ApiFile
  = (fileName = 'file'): any => (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    ApiBody({
      schema: {
        type: 'object',
        required: [fileName],
        properties: {
          [fileName]: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })(target, propertyKey, descriptor);
  };
