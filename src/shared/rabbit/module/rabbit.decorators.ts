import { Inject } from '@nestjs/common';
import { RabbitToken } from './rabbit.constants';

export const InjectRabbit = (): ReturnType<typeof Inject> => Inject(RabbitToken.client);
