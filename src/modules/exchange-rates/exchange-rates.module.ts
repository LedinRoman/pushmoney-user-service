import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeRatesSchema } from '../../schemas/exchange-rates.schema';
import { SchemaName } from '../../models/schemas/schemas.models';
import { ExchangeRatesController } from './exchange-rates.controller';
import { ExchangeRatesService } from './exchange-rates.service';

@Module({
  controllers: [ExchangeRatesController],
  imports: [MongooseModule.forFeature([
    { schema: ExchangeRatesSchema, name: SchemaName.exchaneRates },
  ])],
  providers: [ExchangeRatesService],
})
export class ExchangeRatesModule {}
