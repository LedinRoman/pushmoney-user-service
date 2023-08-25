import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { ILoginRequest } from '../../../models/request/authorization.requests';

export class AuthorizationLoginDto implements ILoginRequest {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
    phone!: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    password!: string;

}
