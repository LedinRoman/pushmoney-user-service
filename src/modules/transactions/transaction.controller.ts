import { Controller, Post, Body, UseFilters, UseGuards, Get, Query } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IGetResponse } from '../../models/responses/shared.responses';
import { ITransaction } from '../../models/schemas/transaction.models';
import { GetUserId } from '../../shared/decorators/extract-user-id.decorator';
import { CustomHttpExceptionFilter } from '../../shared/filters/exception-filter';
import { AuthorizationGuard } from '../authorization/guards/authorization.guard';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { TransactionsService } from './transaction.service';

@ApiTags('Transactions')
@ApiSecurity('JWT')
@UseFilters(CustomHttpExceptionFilter)
@UseGuards(AuthorizationGuard)
@Controller('transactions')
export class TransactionsController {

  private readonly transactionsService: TransactionsService;

  constructor(transactionsService: TransactionsService) {
    this.transactionsService = transactionsService;
  }

  @Post('/create-transaction')
  async createTransaction(@Body() body: CreateTransactionDto, @GetUserId() id: string): Promise<ITransaction> {
    const transaction = await this.transactionsService.createTransaction(body, id);
    return transaction;
  }

  @Get('/get-transactions')
  async getTransactions(
    @Query() query: GetTransactionsDto, // TODO: better to shared
      @GetUserId() id: string,
  ): Promise<IGetResponse<ITransaction>> {
    const transactions = await this.transactionsService.getTransactions(query, id);
    return transactions;
  }

}
