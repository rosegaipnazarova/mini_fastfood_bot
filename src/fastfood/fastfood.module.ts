import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FastfoodService } from './fastfood.service';
import { FastfoodController } from './fastfood.controller';
import { Fastfood, FastfoodSchema, BotUser, BotUserSchema } from './entities/fastfood.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Fastfood.name, schema: FastfoodSchema },
      { name: BotUser.name, schema: BotUserSchema },
    ]),
  ],
  controllers: [FastfoodController],
  providers: [FastfoodService],
})
export class FastfoodModule {}