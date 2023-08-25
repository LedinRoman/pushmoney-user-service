import { setTimeout } from 'timers/promises';
import { Logger } from '@nestjs/common';
import { Channel, Connection, connect } from 'amqplib';
import { RabbitError } from './rabbit.error';
import { IRabbitOptions } from './rabbit.models';

export class RabbitClient {

  private isConnecting: boolean;
  private options: IRabbitOptions;
  private connection: Connection | null;
  private channels: Map<string, Channel>;
  private logger = new Logger(RabbitClient.name);

  constructor(options: IRabbitOptions) {
    this.isConnecting = false;
    this.options = options;
    this.connection = null;
    this.channels = new Map<string, Channel>();
  }

  public async destroy(): Promise<void> {
    for (const [, channel] of this.channels) {
      await channel.close();
    }

    if (this.connection) {
      await this.connection.close();
    }
  }

  public async connect(): Promise<void> {
    if (!this.isConnecting && !this.connection) {
      this.isConnecting = true;

      for (let index = 0; index < this.options.retry; index += 1) {
        try {
          this.connection = await connect(
            {
              hostname: this.options.host,
              port: this.options.port,
              username: this.options.username,
              password: this.options.password,
            },
            {
              timeout: this.options.timeout,
            },
          );

          this.connection.on('error', () => {
            this.connection = null;
            this.channels.clear();
          });

          if (this.options.queues?.length) {
            for (const { name, ...assert } of this.options.queues) {
              const channel = await this.getChannel(name);
              await channel.assertQueue(name, assert);
              this.logger.verbose(`Asserted queue: ${name}`);
            }
          }

          break;
        }
        catch (error) {
          await setTimeout(this.options.timeout);
          continue;
        }
      }

      this.isConnecting = false;
      this.logger.verbose('RabbitMQ connected succesfully');
      return;
    }
    throw new RabbitError('Connection was not established');
  }

  private async getConnection(): Promise<Connection> {
    while (true) {
      if (!this.connection) {
        await this.connect();
        continue;
      }
      return this.connection;
    }
  }

  public async getChannel(id: string): Promise<Channel> {
    const pooled = this.channels.get(id);
    if (pooled) {
      return pooled;
    }

    const connection = await this.getConnection();
    const channel = await connection.createChannel();

    this.channels.set(id, channel);

    return channel;
  }

  public async createChannel(): Promise<Channel> {
    const connection = await this.getConnection();
    const channel = await connection.createChannel();
    return channel;
  }

  public async sendToQueue<TData extends object>(
    queue: string,
    data: TData,
  ): Promise<void> {
    const message = Buffer.from(JSON.stringify(data));
    const channel = await this.getChannel(queue);

    channel.sendToQueue(queue, message);
  }

  public async isHealthy(): Promise<boolean> {
    const exchange = 'amp.direct';
    const channel = await this.getChannel(exchange);

    try {
      await channel.checkExchange(exchange);
      return true;
    }
    catch (error) {
      return false;
    }
  }

}
