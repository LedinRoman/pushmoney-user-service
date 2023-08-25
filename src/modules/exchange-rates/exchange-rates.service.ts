/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { Model, Types } from 'mongoose';
import { SerpapiConfig } from '../../configs/serpapi.config';
import {
  IExchangeRates,
  IExchangeRatesDocument,
} from '../../models/schemas/exchange-rates.models';
import { SchemaName } from '../../models/schemas/schemas.models';

@Injectable()
export class ExchangeRatesService {

  private readonly exchangeRatesModel: Model<
  IExchangeRatesDocument<Types.ObjectId>
  >;
  private readonly serpapiConfig: SerpapiConfig;

  private readonly logger = new Logger(ExchangeRatesService.name);

  constructor(
  @InjectModel(SchemaName.exchaneRates)
    exchangeRatesModel: Model<IExchangeRatesDocument<Types.ObjectId>>,
    serpapiConfig: SerpapiConfig,
  ) {
    this.exchangeRatesModel = exchangeRatesModel;
    this.serpapiConfig = serpapiConfig;
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  public async cronCurrencies(): Promise<void> {
    this.logger.verbose('Init cron currencies');
    const response = await axios
      .get(
        `https://serpapi.com/search?engine=google_finance_markets&api_key=${this.serpapiConfig.apiKey}&trend=currencies`,
      )
      .catch((e) => {
        console.log(e.response.data);
      });
    await this.exchangeRatesModel.deleteMany({});
    await this.exchangeRatesModel.insertMany(
      response?.data?.market_trends[1].results.map((item: any) => {
        const [first_cur, second_cur] = item.name.split(' / ');
        return {
          first_cur,
          second_cur,
          ...item,
        };
      }),
    );
  }

  public async getCurrencies(): Promise<{ currencies: IExchangeRates[] }> {
    const currencies = await this.exchangeRatesModel.find({});
    return { currencies };
  }

}
