import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IRequestCardRequest } from '../../../models/request/cards.requests';
import { AllowedCountries } from '../../../shared/enums';

export class RequestCardDto implements IRequestCardRequest {

  @ApiProperty({ enum: AllowedCountries })
  @IsNotEmpty()
  @IsString()
  @IsEnum(AllowedCountries)
  card_country!: AllowedCountries;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  card_type!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  bank!: string;

  // @ApiProperty()
  //   card_number?: number;

  // @ApiProperty()
  //   card_exp?: number;

  // @ApiProperty()
  //   card_cvv?: number;

  // @ApiProperty()
  //   balance?: number;

  // @ApiProperty()
  //   currency?: string;

  // @ApiProperty()
  //   limit?: number;

  // @ApiProperty()
  //   removed?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  meta?: unknown;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  design_picture?: string;
}
