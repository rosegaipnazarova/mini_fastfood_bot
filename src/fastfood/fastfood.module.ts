import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FastFoodService } from './fastfood.service';
import { FastFoodUpdate } from './fastfood.update';
import { Product, ProductSchema } from './entities/fastfood.entity';

export type ProductDocument = Product & Document;

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])
  ],
  providers: [FastFoodService, FastFoodUpdate],
  exports: [FastFoodService]
})
export class FastFoodModule {}