import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenSchema } from '../../schemas/tokens.schema';
import { UserSchema } from '../../schemas/users.schema';
import { WalletSchema } from '../../schemas/wallet.schema';
import { SchemaName } from '../../models/schemas/schemas.models';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';

@Global()
@Module({
  controllers: [AuthorizationController],
  providers: [AuthorizationService],
  imports: [MongooseModule.forFeature([
    { schema: UserSchema, name: SchemaName.users },
    { schema: TokenSchema, name: SchemaName.tokens },
    { schema: WalletSchema, name: SchemaName.wallets },
  ]),
  ],
  exports: [AuthorizationService],
})
export class AuthrorizationModule {}
