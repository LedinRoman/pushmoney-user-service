import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ICreateTransactionRequest, IGetTransactionsRequest } from '../../models/request/transactions.requests';
import { IGetResponse } from '../../models/responses/shared.responses';
import { ICardDocument } from '../../models/schemas/card.models';
import { IExchangeRatesDocument } from '../../models/schemas/exchange-rates.models';
import { SchemaName } from '../../models/schemas/schemas.models';
import { ITransaction, ITransactionDocument } from '../../models/schemas/transaction.models';
import { IWalletDocument } from '../../models/schemas/wallet.models';
import { AllowedCurrencies, TransactionsStatuses, TransactionTypes } from '../../shared/enums';
import { RabbitClient } from '../../shared/rabbit/client/rabbit.client';
import { InjectRabbit } from '../../shared/rabbit/module/rabbit.decorators';

@Injectable()
export class TransactionsService {

  private readonly transactionModel: Model<
  ITransactionDocument<Types.ObjectId>
  >;
  private readonly cardModel: Model<ICardDocument<Types.ObjectId>>;
  private readonly walletModel: Model<IWalletDocument<Types.ObjectId>>;
  private readonly rateModel: Model<IExchangeRatesDocument<Types.ObjectId>>;
  private readonly rabbitClient: RabbitClient;

  constructor(
  @InjectModel(SchemaName.transactions)
    transactionModel: Model<ITransactionDocument<Types.ObjectId>>,
    @InjectModel(SchemaName.cards)
    cardModel: Model<ICardDocument<Types.ObjectId>>,
    @InjectModel(SchemaName.wallets)
    walletModel: Model<IWalletDocument<Types.ObjectId>>,
    @InjectModel(SchemaName.exchaneRates)
    rateModel: Model<IExchangeRatesDocument<Types.ObjectId>>,
    @InjectRabbit() rabbitClient: RabbitClient,
  ) {
    this.transactionModel = transactionModel;
    this.cardModel = cardModel;
    this.walletModel = walletModel;
    this.rateModel = rateModel;
    this.rabbitClient = rabbitClient;
  }

  // TODO: separate funcs
  public async createTransaction(
    body: ICreateTransactionRequest,
    _id: string,
    transaction_type = TransactionTypes.sendToCard,
  ): Promise<ITransaction> {
    let receiver = '';
    let receiverBank = '';

    // make transaction usual
    if (body.sender_card_number) {
      const userCard = await this.cardModel.findOne({
        user_id: _id,
        card_number: body.sender_card_number,
      });
      if (!userCard || !userCard.balance) {
        throw new NotFoundException(
          'Card not found in your wallet or balance = 0',
        );
      }
      if (body.amount > userCard.balance) {
        throw new BadRequestException('Not enough money to make transaction');
      }

      await this.cardModel.updateOne({
        user_id: _id,
        card_number: body.sender_card_number,
      }, { $inc: { balance: -body.amount } });
    }

    // deposit to card from wallet
    let walletCard = false;
    if (!body.sender_card_number && body.receiver_card_number) {
      // check wallet amount, existence of card, make it in swap with curr
      const userWallet = await this.walletModel.findOne({ user_id: _id });
      const userCard = await this.cardModel.findOne({
        user_id: _id,
        card_number: body.receiver_card_number,
      });

      if (!userWallet || !userCard) {
        throw new BadRequestException('Wallet or card not found');
      }

      const pairRubUsd = await this.rateModel.findOne({ first_cur: 'RUB', second_cur: 'USD' });
      if (!pairRubUsd) {
        throw new BadRequestException('Currency could not be changed now');
      }
      const rublesInDollar = 1 / pairRubUsd.price;

      // TODO check ruble
      const pairCurrUsd = await this.rateModel.findOne({ first_cur: userCard.currency, second_cur: 'USD' });
      if (!pairCurrUsd) {
        throw new BadRequestException('Currency could not be changed now');
      }
      const amountUsd = body.amount * pairCurrUsd.price;

      const decrementFromWallet = amountUsd * rublesInDollar;
      if (userWallet.balance! < decrementFromWallet) {
        throw new BadRequestException('Not enough cash');
      }

      await this.walletModel.updateOne({ _id: userWallet._id }, { $inc: { balance: -decrementFromWallet } });
      await this.cardModel.updateOne({ _id: userCard._id }, { $inc: { balance: body.amount } });
      walletCard = true;
    }

    if (!walletCard) {
      if (body.receiver_card_number) {
        const responseReceiver = await this.cardModel.findOne({
          card_number: body.receiver_card_number,
        });


        if (responseReceiver) {
          if (body.currency_name && responseReceiver?.currency !== body.currency_name) {
            throw new BadRequestException('Cant make that payment, choose card with another currency');
          }
          receiver = responseReceiver._id.toString();
          receiverBank = responseReceiver.bank as string;
          await this.cardModel.updateOne({ card_number: responseReceiver.card_number }, { $inc: { balance: body.amount } });
        }
      }
    }

    const transaction = await this.transactionModel.create({
      amount: body.amount,
      currency_name: body.currency_name ?? AllowedCurrencies.DigitalRub,
      transaction_type: body.currency_name
        ? TransactionTypes.depositWallet
        : transaction_type,
      sender_user_id: _id,
      sender_card_number: body.sender_card_number ?? 0, // means top up wallet
      receiver_user_id: receiver,
      receiver_card_number: body.receiver_card_number ?? 0, // means top up wallet
      status: TransactionsStatuses.success, // later will be changes to statuses
      signature: body.signature,
    });

    if (body.sender_bank) {
      const message = {
        sender_bank: body.sender_bank,
        ...transaction,
        receiver_bank: receiverBank,
      };
      await this.rabbitClient.sendToQueue('newTransactions', message);
    }

    return transaction;
  }

  public async getTransactions(query: IGetTransactionsRequest, id: string): Promise<IGetResponse<ITransaction>> {
    const data = await this.transactionModel.find({ $or: [{ sender_user_id: id }, { receiver_user_id: id }] }).limit(query.size).skip(query.page * query.size);
    const count = await this.transactionModel.count({});

    return { data, count };
  }

}
