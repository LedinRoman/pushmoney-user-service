import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class UnavailableService {

  @ApiProperty()
  public status!: HttpStatus.BAD_REQUEST;

  @ApiProperty()
  public message!: string[];

  @ApiProperty()
  public error!: string;

}
