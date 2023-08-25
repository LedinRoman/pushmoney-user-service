import { Controller, Post, Body, Patch, UseFilters, UseGuards, Get } from '@nestjs/common';
import { ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IDocFile } from '../../models/request/file.requset';
import { IUser } from '../../models/schemas/users.models';
import { IWallet } from '../../models/schemas/wallet.models';
import { ExtractFile } from '../../shared/decorators/extract-file.decorator';
import { GetUserId } from '../../shared/decorators/extract-user-id.decorator';
import { ApiFile } from '../../shared/decorators/file-consume.decorator';
import { CustomHttpExceptionFilter } from '../../shared/filters/exception-filter';
import { AuthorizationGuard } from '../authorization/guards/authorization.guard';
import { DepositDto } from './dto/deposit.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { VerifySmsDto } from './dto/verify-sms.dto';
import { UserService } from './users.service';

@ApiTags('User')
@ApiSecurity('JWT')
@UseFilters(CustomHttpExceptionFilter)
@UseGuards(AuthorizationGuard)
@Controller('user')
export class UserController {

  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  @Post('/send-sms')
  async sendCode(@GetUserId() id: string): Promise<void> {
    await this.userService.sendCode(id);
  }

  @Post('/verify-sms')
  async verifyCode(
    @Body() body: VerifySmsDto,
      @GetUserId() id: string,
  ): Promise<void> {
    await this.userService.verifySms(body, id);
  }

  @Post('/deposit')
  async deposit(
    @Body() body: DepositDto,
      @GetUserId() id: string,
  ): Promise<IWallet> {
    const wallet = await this.userService.deposit(body, id);
    return wallet;
  }

  @Get('/me')
  async getMe(@GetUserId() id: string): Promise<IUser> {
    const user = await this.userService.getMe(id);
    return user;
  }

  @Patch('/profile')
  async updateProfile(
    @Body() body: UpdateProfileDto,
      @GetUserId() id: string,
  ): Promise<IUser> {
    const response = await this.userService.updateProfile(body, id);
    return response;
  }

  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @Patch('/photo')
  async changePhoto(
    @ExtractFile('file') file: IDocFile,
      @GetUserId() id: string,
  ): Promise<IUser> {
    const response = await this.userService.changePhoto(file, id);
    return response;
  }

}
