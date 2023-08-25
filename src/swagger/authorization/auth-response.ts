import { applyDecorators, HttpStatus } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { TokensDto } from '../dto/tokens.response';
import { UnavailableService } from '../dto/unavailable-service.response';

export const ApiSignUp = (): MethodDecorator => applyDecorators(
  ApiResponse({
    status: HttpStatus.OK,
    description: 'User sign up succesfully response',
    type: TokensDto,
  }),
  ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User not found',
    type: UnavailableService,
  }),
  ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: UnavailableService,
  }),
);

export const ApiLogin = (): MethodDecorator => applyDecorators(
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Login succesfully response',
    type: TokensDto,
  }),
  ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: UnavailableService,
  }),
  ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: UnavailableService,
  }),
);

export const ApiRefresh = (): MethodDecorator => applyDecorators(
  ApiResponse({
    status: HttpStatus.OK,
    description: 'Refresh succesfully response',
    type: () => TokensDto,
  }),
  ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
    type: UnavailableService,
  }),
);
