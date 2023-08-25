import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as AWS from 'aws-sdk';
import { Model, Types } from 'mongoose';
import { S3Config } from '../../configs/s3.config';
import { IDocFile } from '../../models/request/file.requset';
import {
  IDepositRequest,
  IUpdateProfileRequest,
  IVerifyCodeRequset,
} from '../../models/request/user.requests';
import { SchemaName } from '../../models/schemas/schemas.models';
import { IUser, IUserDocument } from '../../models/schemas/users.models';
import { IWallet, IWalletDocument } from '../../models/schemas/wallet.models';
import { InjectS3 } from '../../shared/s3/nestjs/s3.decorator';
import { AuthorizationService } from '../authorization/authorization.service';

@Injectable()
export class UserService {

  private readonly userModel: Model<IUserDocument<Types.ObjectId>>;
  private readonly walletModel: Model<IWalletDocument<Types.ObjectId>>;
  private readonly authorizationService: AuthorizationService;
  private readonly s3Client: AWS.S3;
  private readonly s3Config: S3Config;

  private readonly logger = new Logger(UserService.name);

  constructor(
  @InjectModel(SchemaName.users)
    userModel: Model<IUserDocument<Types.ObjectId>>,
    @InjectModel(SchemaName.wallets)
    walletModel: Model<IWalletDocument<Types.ObjectId>>,
    @InjectS3() s3Client: AWS.S3,
    authorizationService: AuthorizationService,
    s3Config: S3Config,
  ) {
    this.userModel = userModel;
    this.walletModel = walletModel;
    this.s3Config = s3Config;
    this.authorizationService = authorizationService;
    this.s3Client = s3Client;
  }

  public onModuleInit(): void {
    try {
      const S3ConfigData = this.s3Config.getBucketData;
      const isCreated = this.s3Client.headBucket({
        Bucket: S3ConfigData.bucketName,
      });

      if (!isCreated) {
        this.s3Client.createBucket({
          Bucket: S3ConfigData.bucketName,
          CreateBucketConfiguration: {
            LocationConstraint: S3ConfigData.bucketRegion,
          },
        });
      }

      this.logger.verbose('Bucket: "PUSHMONEY!" succesfully initialized');
    }
    catch (error) {
      this.logger.warn(error);
    }
  }

  public async sendCode(_id: string): Promise<void> {
    // const code = Math.floor(1000 + Math.random() * 9000);
    // mock sending sms here with random code 🐊🐊🐊

    const user = await this.userModel.findOneAndUpdate(
      { _id, is_verified: false },
      { code: 4444 },
    );
    if (!user) {
      throw new NotFoundException('User already verified phone number');
    }
  }

  public async verifySms(body: IVerifyCodeRequset, _id: string): Promise<void> {
    const user = await this.userModel.findOneAndUpdate(
      { _id, code: body.code },
      { code: null, is_verified: true },
    );
    if (!user) {
      throw new NotFoundException('Incorrect code');
    }
  }

  public async deposit(body: IDepositRequest, _id: string): Promise<IWallet> {
    // Here we mock logic to request CRYPTORUBLE 🚀🚀🚀

    const wallet = await this.walletModel.findOneAndUpdate(
      { user_id: _id },
      { $inc: { balance: +body.amount } },
      { new: true },
    );
    if (!wallet) {
      throw new NotFoundException('Incorrect code');
    }

    // TODO: add trasnaction later

    return wallet as IWallet;
  }

  public async getMe(_id: string): Promise<IUser> {
    // TODO: bad one, but will fix it later 🛠️🛠️🛠️
    const user = await this.userModel
      .findById(_id)
      .populate('wallet')
      .populate('cards');
    if (!user) {
      throw new NotFoundException('Incorrect code');
    }
    return user;
  }

  public async updateProfile(
    body: IUpdateProfileRequest,
    _id: string,
  ): Promise<IUser> {
    const {
      birth_date,
      phone,
      password,
      full_name,
      email,
      telegram,
      location,
      ...rest
    } = body;

    const updateData: Partial<IUserDocument> = { ...rest };
    if (phone) {
      const countUnique = await this.userModel.count({ phone: body.phone });
      if (countUnique) {
        throw new ConflictException('Phone already used');
      }
      updateData.is_verified = false;
      updateData.phone = phone;
    }
    if (password) {
      updateData.password = await this.authorizationService.encryptPassword(
        password,
      );
    }
    if (birth_date) {
      updateData.birth_date = new Date(Date.parse(birth_date));
    }
    if (full_name) {
      updateData.full_name_low = full_name.toLowerCase();
    }
    if (email) {
      updateData.contacts = { email: body.email, ...updateData.contacts };
    }
    if (telegram) {
      updateData.contacts = { telegram: body.telegram, ...updateData.contacts };
    }
    if (location) {
      updateData.location = location;
    }

    const user = await this.userModel.findOneAndUpdate({ _id }, updateData, {
      new: true,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async changePhoto(file: IDocFile, _id: string): Promise<IUser> {
    const id = new Types.ObjectId().toString();

    const S3ConfigData = this.s3Config.getBucketData;
    const params = {
      Bucket: S3ConfigData.bucketName,
      Key: id,
      Body: file.data,
    };
    const data = await this.s3Client.upload(params).promise();

    const user = await this.userModel.findOneAndUpdate(
      { _id },
      { avatar: data.Location },
      { new: true },
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

}
