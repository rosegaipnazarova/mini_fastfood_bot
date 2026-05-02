import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FastfoodDocument = HydratedDocument<Fastfood>;

@Schema()
export class Fastfood {
  @Prop()
  name!: string;

  @Prop()
  price!: number;

  @Prop()
  category!: string; 

  @Prop()
  description!: string; 

  @Prop()
  image!: string; 
}

export const FastfoodSchema = SchemaFactory.createForClass(Fastfood);

@Schema()
export class BotUser {
  @Prop()
  chatId!: number;

  @Prop()
  name!: string;

  @Prop()
  phone!: string;

  @Prop({ type: Object })
  location!: { latitude: number; longitude: number };

  @Prop({ default: 'START' })
  lastState!: string;
}

export const BotUserSchema = SchemaFactory.createForClass(BotUser);