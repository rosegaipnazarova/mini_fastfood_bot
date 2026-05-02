import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Product extends Document {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  price!: number;

  @Prop()
  image!: string; // Rasm URL yoki file_id

  @Prop()
  description!: string; // Tarkibi

  @Prop({ required: true, enum: ['food', 'drink', 'dessert'] })
  category!: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);