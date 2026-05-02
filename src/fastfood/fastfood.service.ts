import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product} from './entities/fastfood.entity';

export type ProductDocument = Product & Document;

@Injectable()
export class FastFoodService {
  constructor(@InjectModel(Product.name) private productModel: Model<ProductDocument>) {}

  // Kategoriyaga qarab mahsulotlarni topish
  async findByCategory(category: string): Promise<Product[]> {
    return this.productModel.find({ category }).exec();
  }

  // Barcha mahsulotlar (kerak bo'lib qolsa)
  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}