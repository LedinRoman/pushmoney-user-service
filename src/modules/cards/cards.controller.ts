import { Controller, Post, Body, UseFilters, UseGuards, Get, Patch, Param, Delete } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { ICard } from '../../models/schemas/card.models';
import { GetUserId } from '../../shared/decorators/extract-user-id.decorator';
import { CustomHttpExceptionFilter } from '../../shared/filters/exception-filter';
import { AuthorizationGuard } from '../authorization/guards/authorization.guard';
import { CardsService } from './cards.service';
import { CardIdDto } from './dto/card-id.dto';
import { RequestCardDto } from './dto/request-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiTags('Cards')
@ApiSecurity('JWT')
@UseFilters(CustomHttpExceptionFilter)
@UseGuards(AuthorizationGuard)
@Controller('cards')
export class CardsController {

  private readonly cardsService: CardsService;

  constructor(cardsService: CardsService) {
    this.cardsService = cardsService;
  }

  @Post('/request-card')
  async requestCard(
    @Body() body: RequestCardDto,
      @GetUserId() id: string,
  ): Promise<ICard> {
    const card = await this.cardsService.requestCard(body, id);
    return card;
  }

  @Get('/get-designs')
  getDesigns(): unknown {
    return {
      design1:
        'https://dev-content-shuffle.s3.amazonaws.com/64407339-aa1c-4bb3-a13e-da9712d0c069',
      design2:
        'https://dev-content-shuffle.s3.eu-west-2.amazonaws.com/d951f636-c9f2-4996-ac95-bbb493ba8d5a',
      design3:
        'https://dev-content-shuffle.s3.eu-west-2.amazonaws.com/f495e949-be45-4ff3-b093-63a3562e8fb3',
      design4:
        'https://dev-content-shuffle.s3.eu-west-2.amazonaws.com/a769c324-f4cf-4cb0-b410-7f1e696421e4',
      design5:
        'https://dev-content-shuffle.s3.eu-west-2.amazonaws.com/21e8bb58-62e6-4833-bce4-8be4da75ac3b',
    };
  }

  @Get('/get-cards')
  async getCards(@GetUserId() id: string): Promise<ICard[]> {
    const cards = await this.cardsService.getCards(id);
    return cards;
  }

  @Patch('/update-card/:cardId')
  async updateCard(
    @Body() body: UpdateCardDto,
      @Param() param: CardIdDto,
      @GetUserId() id: string,
  ): Promise<ICard> {
    const card = await this.cardsService.updateCard(param.cardId, body, id);
    return card;
  }

  @Delete('/:cardId')
  async removeCard(
    @Param() param: CardIdDto,
      @GetUserId() id: string,
  ): Promise<void> {
    await this.cardsService.removeCard(param.cardId, id);
  }

}
