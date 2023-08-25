import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IRefreshRequest } from '../../../models/request/authorization.requests';

export class AuthorizationRefreshDto implements IRefreshRequest {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    refreshToken!: string;

}
