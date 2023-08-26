import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length } from 'class-validator';
import { ICreateTransactionRequest } from '../../../models/request/transactions.requests';
import { AllowedCurrencies } from '../../../shared/enums';

export class CreateTransactionDto implements ICreateTransactionRequest {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
    amount!: number;

  @ApiProperty({ enum: AllowedCurrencies })
  @IsNotEmpty()
  @IsString()
  @IsEnum(AllowedCurrencies)
    currency_name?: AllowedCurrencies;

  @ApiPropertyOptional({ example: 1111222233335555 })
  @IsOptional()
  @IsNumber()
  @Length(16, 16)
    sender_card_number?: number;

  @ApiPropertyOptional({ example: 'TINKOFF' })
  @IsOptional()
  @IsString()
    sender_bank?: string;

  @ApiPropertyOptional({ example: 1111222233334444 })
  @IsOptional()
  @IsNumber()
  @Length(16, 16)
    receiver_card_number?: number;

  @ApiProperty({ example: 'any string' })
  @IsNotEmpty()
  @IsString()
    signature?: string;

}
