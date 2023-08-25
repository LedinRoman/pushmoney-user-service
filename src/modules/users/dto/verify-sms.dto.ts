import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import { IVerifyCodeRequset } from '../../../models/request/user.requests';

export class VerifySmsDto implements IVerifyCodeRequset {

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Length(4)
    code!: number;

}
