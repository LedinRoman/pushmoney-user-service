import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from '../../schemas/card.schema';
import { ExchangeRatesSchema } from '../../schemas/exchange-rates.schema';
import { TransactionSchema } from '../../schemas/transactions.schema';
import { WalletSchema } from '../../schemas/wallet.schema';
import { SchemaName } from '../../models/schemas/schemas.models';
import { TransactionsController } from './transaction.controller';
import { TransactionsService } from './transaction.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    MongooseModule.forFeature([
      { schema: CardSchema, name: SchemaName.cards },
      { schema: TransactionSchema, name: SchemaName.transactions },
      { schema: WalletSchema, name: SchemaName.wallets },
      { schema: ExchangeRatesSchema, name: SchemaName.exchaneRates },
    ]),
  ],
  exports: [TransactionsService],
})
export class TransactionsModule {}
