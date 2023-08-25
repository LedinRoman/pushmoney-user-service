import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { IGetTransactionsRequest } from '../../../models/request/transactions.requests';
import { transofrmNum } from '../../../shared/utils';

export class GetTransactionsDto implements IGetTransactionsRequest {

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(transofrmNum)
  public page!: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(transofrmNum)
  public size!: number;

}
