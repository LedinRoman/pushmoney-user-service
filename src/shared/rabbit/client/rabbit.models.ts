import { Options } from 'amqplib';

export interface IRabbitOptionsQueue extends Options.AssertQueue {
  name: string;
}

export interface IRabbitOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  timeout: number;
  retry: number;
  queues?: IRabbitOptionsQueue[];
}
