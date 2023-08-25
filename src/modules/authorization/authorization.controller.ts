import { Controller, Post, Body, Patch, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ITokensResponse } from '../../models/responses/shared.responses';
import { CustomHttpExceptionFilter } from '../../shared/filters/exception-filter';
import {
  ApiLogin,
  ApiRefresh,
  ApiSignUp,
} from '../../swagger/authorization/auth-response';
import { AuthorizationService } from './authorization.service';
import { AuthorizationLoginDto } from './dto/authorization-login.dto';
import { AuthorizationRefreshDto } from './dto/authorization-refresh.dto';
import { AuthorizationRestoreDto } from './dto/authorization-refresh.dto copy';

@ApiTags('Authorization')
@UseFilters(CustomHttpExceptionFilter)
@Controller('auth')
export class AuthorizationController {

  private readonly authorizationService: AuthorizationService;

  constructor(authorizationService: AuthorizationService) {
    this.authorizationService = authorizationService;
  }

  @ApiSignUp()
  @Post('/sign-up')
  async signUp(@Body() body: AuthorizationLoginDto): Promise<ITokensResponse> {
    const response = await this.authorizationService.signUp(body);
    return response;
  }

  @ApiLogin()
  @Post('/sign-in')
  async signIn(@Body() body: AuthorizationLoginDto): Promise<ITokensResponse> {
    const response = await this.authorizationService.signIn(body);
    return response;
  }

  @ApiLogin()
  @Post('/restore-password')
  async restorePassword(@Body() body: AuthorizationRestoreDto): Promise<ITokensResponse> {
    const response = await this.authorizationService.restore(body);
    return response;
  }

  @ApiRefresh()
  @Patch('/refresh')
  async refresh(
    @Body() body: AuthorizationRefreshDto,
  ): Promise<ITokensResponse> {
    const tokens = await this.authorizationService.refresh(body);
    return tokens;
  }

}
