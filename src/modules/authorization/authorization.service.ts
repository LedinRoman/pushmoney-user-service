import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Model, Types } from 'mongoose';
import { AuthConfig } from '../../configs/auth.config';
import {
  ILoginRequest,
  IRefreshRequest,
  IRestoreRequest,
} from '../../models/request/authorization.requests';
import { ITokensResponse } from '../../models/responses/shared.responses';
import { SchemaName } from '../../models/schemas/schemas.models';
import { ITokensDocument } from '../../models/schemas/tokens.models';
import { IUserDocument } from '../../models/schemas/users.models';
import { IWalletDocument } from '../../models/schemas/wallet.models';

@Injectable()
export class AuthorizationService {

  private readonly authConfig: AuthConfig;
  private readonly userModel: Model<IUserDocument<Types.ObjectId>>;
  private readonly tokenModel: Model<ITokensDocument<Types.ObjectId>>;
  private readonly walletModel: Model<IWalletDocument<Types.ObjectId>>;

  constructor(
  @InjectModel(SchemaName.users)
    userModel: Model<IUserDocument<Types.ObjectId>>,
    @InjectModel(SchemaName.tokens)
    tokenModel: Model<ITokensDocument<Types.ObjectId>>,
    @InjectModel(SchemaName.wallets)
    walletModel: Model<IWalletDocument<Types.ObjectId>>,
    authConfig: AuthConfig,
  ) {
    this.userModel = userModel;
    this.tokenModel = tokenModel;
    this.walletModel = walletModel;
    this.authConfig = authConfig;
  }

  public async signUp(body: ILoginRequest): Promise<ITokensResponse> {
    const checkUserExist = await this.userModel.count({ phone: body.phone });
    if (checkUserExist) {
      throw new ConflictException('Unique phone required');
    }

    const walletId = new Types.ObjectId();
    const hash = await this.encryptPassword(body.password);
    const user = await this.userModel.create({
      phone: body.phone,
      password: hash,
      wallet: walletId,
    });

    const tokens = this.makeTokens({ _id: user._id });
    await this.tokenModel.create({ user_id: user._id, ...tokens });
    await this.walletModel.create({
      _id: walletId,
      balance: 0,
      user_id: user._id,
    });

    return tokens;
  }

  public async signIn(body: ILoginRequest): Promise<ITokensResponse> {
    const hash = await this.encryptPassword(body.password);
    const user = await this.userModel.findOne({
      phone: body.phone,
      password: hash,
    });
    if (!user) {
      throw new ForbiddenException('Incorrect login or password');
    }

    const tokens = this.makeTokens({ _id: user._id });
    await this.tokenModel.updateOne({ user_id: user._id }, tokens);
    return tokens;
  }

  public async restore(body: IRestoreRequest): Promise<ITokensResponse> {
    if (body.code !== 4444) {
      throw new BadRequestException('Incorrect code');
    }

    const hash = await this.encryptPassword(body.password);
    const user = await this.userModel.findOneAndUpdate({
      phone: body.phone,
    }, {
      password: hash,
    });
    if (!user) {
      throw new ForbiddenException('Incorrect login or password');
    }

    const tokens = this.makeTokens({ _id: user._id });
    await this.tokenModel.updateOne({ user_id: user._id }, tokens);
    return tokens;
  }

  public async refresh(body: IRefreshRequest): Promise<ITokensResponse> {
    const payload = this.verifyToken(body.refreshToken, false);

    const tokenData = await this.tokenModel.findOne({
      refresh_token: body.refreshToken,
      user_id: payload._id,
    });
    if (!tokenData) {
      throw new BadRequestException('Incorrect token');
    }

    const tokens = this.makeTokens({ _id: payload._id });
    await this.tokenModel.updateOne({ user_id: payload._id }, tokens);

    return tokens;
  }

  public makeTokens(data: object = {}): ITokensResponse {
    const access_token: string = jwt.sign(data, this.authConfig.accessSecret, {
      expiresIn: this.authConfig.accesssExpire,
    });
    const refresh_token: string = jwt.sign(
      data,
      this.authConfig.refreshSecret,
      {
        expiresIn: this.authConfig.refreshExpire,
      },
    );
    return {
      access_token,
      refresh_token,
    };
  }

  public verifyToken(token: string, isAccess = true): JwtPayload {
    const { accessSecret, refreshSecret } = this.authConfig;
    const tokenData = jwt.verify(
      token,
      isAccess ? accessSecret : refreshSecret,
    ) as JwtPayload;

    if (!tokenData) {
      throw new BadRequestException('Incorrect token');
    }
    if (tokenData.exp! <= Date.now() / 1000) {
      throw new BadRequestException('Token expired');
    }
    return tokenData as JwtPayload;
  }

  public async encryptPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this.authConfig.salt);
    return hash;
  }

}
