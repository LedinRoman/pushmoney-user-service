import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from './configs/config.module';
import { MongoConfig } from './configs/mongo.config';
import { RabbitmqConfig } from './configs/rabbitmq.config';
import { S3Config } from './configs/s3.config';
import { AuthrorizationModule } from './modules/authorization/authorization.module';
import { CardModule } from './modules/cards/cards.module';
import { ExchangeRatesModule } from './modules/exchange-rates/exchange-rates.module';
import { HealthModule } from './modules/health/health.module';
import { TransactionsModule } from './modules/transactions/transaction.module';
import { UserModule } from './modules/users/users.module';
import { RabbitModule } from './shared/rabbit/module/rabbit.module';
import { S3Module } from './shared/s3/nestjs/s3.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: MongoConfig,
    }),
    S3Module.forRootAsync({
      imports: [ConfigModule],
      useExisting: S3Config,
    }),
    RabbitModule.forRootAsync({
      imports: [ConfigModule],
      useExisting: RabbitmqConfig,
    }),
    ScheduleModule.forRoot(),
    HealthModule,
    AuthrorizationModule,
    UserModule,
    ExchangeRatesModule,
    CardModule,
    TransactionsModule,
  ],
})
export class AppModule {}
