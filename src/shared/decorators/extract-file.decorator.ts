import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { IDocFile } from '../../models/request/file.requset';

export const ExtractFile = createParamDecorator((key: string, ctx: ExecutionContext): IDocFile | undefined => {
  const request = ctx.switchToHttp().getRequest<FastifyRequest>();
  const file = Object.getOwnPropertyDescriptor(request.body, key)?.value as IDocFile | undefined;
  return file;
});
