export class CreateFastfoodDto {
  name!: string;
  price!: number;
  image!: string;
  description!: string;
  category!: 'food' | 'drink' | 'dessert';
}