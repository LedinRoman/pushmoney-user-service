/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch()
export class CustomHttpExceptionFilter implements ExceptionFilter {

  private logger: Logger;

  constructor() {
    this.logger = new Logger(CustomHttpExceptionFilter.name);
  }

  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const isHttpException = exception instanceof HttpException;
    const isError = exception instanceof Error;

    const httpStatus = isHttpException
      ? exception.getStatus()
      : HttpStatus.BAD_REQUEST;

    let message = isHttpException
      ? exception.message
      : 'Bad Request';

    if (isError) {
      message = exception.toString();
    }

    if (Array.isArray(exception?.response?.message)) {
      message = exception.response.message.join(' & ');
    }

    const responseBody = {
      statusCode: httpStatus,
      error: message,
    };

    this.logger.error(message);
    const response = ctx.getResponse<FastifyReply>();
    response.status(httpStatus).send(responseBody);
  }

}
