import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from '../../schemas/card.schema';
import { UserSchema } from '../../schemas/users.schema';
import { WalletSchema } from '../../schemas/wallet.schema';
import { SchemaName } from '../../models/schemas/schemas.models';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
  controllers: [CardsController],
  providers: [CardsService],
  imports: [
    MongooseModule.forFeature([
      { schema: UserSchema, name: SchemaName.users },
      { schema: WalletSchema, name: SchemaName.wallets },
      { schema: CardSchema, name: SchemaName.cards },
    ]),
  ],
})
export class CardModule {}
