import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Types } from 'mongoose';

export const GetUserId = createParamDecorator((_data: unknown, ctx: ExecutionContext): string => {
  const request = ctx.switchToHttp().getRequest < FastifyRequest & { userId: Types.ObjectId }>();
  if (!request?.userId) {
    throw new UnauthorizedException();
  }

  return request.userId.toString();
});
