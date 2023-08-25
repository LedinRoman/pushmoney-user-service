import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UnavailableService } from '../dto/unavailable-service.response';

export const ApiHealthResponse = (): MethodDecorator => applyDecorators(
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Health check passed',
  }),
  ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Service unavailable',
    type: () => UnavailableService,
  }),
);
