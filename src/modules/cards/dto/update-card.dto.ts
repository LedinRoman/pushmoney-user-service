import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { IUpdateCardRequest } from '../../../models/request/cards.requests';

export class UpdateCardDto implements IUpdateCardRequest {

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
    block?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    design_picture?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  @IsPositive()
    limit?: number;

}
