import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { FastfoodModule } from './fastfood/fastfood.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb+srv://rosegaipnazarova_db_user:hFX5IweCd4B5akZB@cluster0.zb1ezax.mongodb.net/fastfood_db'),

    FastfoodModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}