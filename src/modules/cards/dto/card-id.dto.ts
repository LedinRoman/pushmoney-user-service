import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { ICardIdRequest } from '../../../models/request/cards.requests';

export class CardIdDto implements ICardIdRequest {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
    cardId!: string;

}
