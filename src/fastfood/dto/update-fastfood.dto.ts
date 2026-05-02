import { PartialType } from '@nestjs/mapped-types';
import { CreateFastfoodDto } from './create-fastfood.dto';

export class UpdateFastfoodDto extends PartialType(CreateFastfoodDto) {}
