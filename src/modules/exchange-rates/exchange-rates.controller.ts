import {
  Controller,
  UseFilters,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IExchangeRates } from '../../models/schemas/exchange-rates.models';
import { CustomHttpExceptionFilter } from '../../shared/filters/exception-filter';
import { ExchangeRatesService } from './exchange-rates.service';

@ApiTags('Exchange Rates')
@UseFilters(CustomHttpExceptionFilter)
@Controller('exchange-rates')
export class ExchangeRatesController {

  private readonly exchangeRatesService: ExchangeRatesService;

  constructor(exchangeRatesService: ExchangeRatesService) {
    this.exchangeRatesService = exchangeRatesService;
  }

  @Get('/currencies')
  async sendCode(): Promise<{ currencies: IExchangeRates[] }> {
    const response = await this.exchangeRatesService.getCurrencies();
    return response;
  }

}
