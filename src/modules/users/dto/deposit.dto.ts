import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { IDepositRequest } from '../../../models/request/user.requests';

export class DepositDto implements IDepositRequest {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
    amount!: number;

}
