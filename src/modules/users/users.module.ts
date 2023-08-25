import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../../schemas/users.schema';
import { WalletSchema } from '../../schemas/wallet.schema';
import { SchemaName } from '../../models/schemas/schemas.models';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([
      { schema: UserSchema, name: SchemaName.users },
      { schema: WalletSchema, name: SchemaName.wallets },
    ]),
  ],
})
export class UserModule {}
