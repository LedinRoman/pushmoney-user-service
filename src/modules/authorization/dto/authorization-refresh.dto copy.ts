import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPhoneNumber, IsString, Length } from 'class-validator';
import { IRestoreRequest } from '../../../models/request/authorization.requests';

export class AuthorizationRestoreDto implements IRestoreRequest {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Length(4)
  code!: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password!: string;
}
