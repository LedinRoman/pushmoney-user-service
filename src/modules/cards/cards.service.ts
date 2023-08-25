import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { IRequestCardRequest, IUpdateCardRequest } from '../../models/request/cards.requests';
import { ICard, ICardDocument } from '../../models/schemas/card.models';
import { SchemaName } from '../../models/schemas/schemas.models';
import { CardStatuses, CountryCurrency } from '../../shared/enums';
import { RabbitClient } from '../../shared/rabbit/client/rabbit.client';
import { InjectRabbit } from '../../shared/rabbit/module/rabbit.decorators';

@Injectable()
export class CardsService {

  private readonly cardModel: Model<ICardDocument<Types.ObjectId>>;
  private readonly rabbitClient: RabbitClient;

  constructor(
  @InjectModel(SchemaName.cards)
    cardModel: Model<ICardDocument<Types.ObjectId>>,
    @InjectRabbit() rabbitClient: RabbitClient,
  ) {
    this.cardModel = cardModel;
    this.rabbitClient = rabbitClient;
  }

  public async requestCard(
    body: IRequestCardRequest,
    _id: string,
  ): Promise<ICard> {
    const card = await this.cardModel.create({
      user_id: _id,
      card_number:
        1111222233000000 + Math.floor(Math.random() * 900000 + 100000), // mock data
      card_exp: new Date(Date.now() + 3.156e11), // mock 10 years exp
      card_cvv: Math.floor(Math.random() * 900 + 100), // mock cvv
      currency: CountryCurrency[body.card_country],
      ...body,
    });

    // TODO: receive it at business service
    await this.rabbitClient.sendToQueue('requestCards', {
      user_id: _id,
      card_id: card._id,
      ...body,
    });

    return card;
  }

  public async getCards(_id: string): Promise<ICard[]> {
    const cards = await this.cardModel.find({ user_id: _id, removed: false });
    return cards;
  }

  public async updateCard(
    cardId: string,
    body: IUpdateCardRequest,
    user_id: string,
  ): Promise<ICard> {
    const { block, limit, ...rest } = body;
    const updateData: Partial<ICard> = { ...rest };
    if (block) {
      updateData.status = CardStatuses.blocked;
    }
    if (limit) {
      updateData.limit = limit;
    }

    const card = await this.cardModel.findOneAndUpdate(
      { user_id, _id: cardId },
      updateData,
      { new: true },
    );
    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (block || limit) {
      await this.rabbitClient.sendToQueue('updateCards', {
        user_id,
        card_id: card._id,
        ...body,
      });
    }
    return card;
  }

  public async removeCard(cardId: string, user_id: string): Promise<void> {
    await this.cardModel.updateOne({ user_id, _id: cardId }, { removed: true });
  }

}
