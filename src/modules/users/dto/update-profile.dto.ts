import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { IUpdateProfileRequest } from '../../../models/request/user.requests';

export class UpdateProfileDto implements IUpdateProfileRequest {

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
    phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    full_name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    telegram?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    birth_date?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
    location?: string;

}
