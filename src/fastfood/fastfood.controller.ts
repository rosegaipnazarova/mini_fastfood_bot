import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { FastFoodService } from './fastfood.service';
import { CreateFastfoodDto } from './dto/create-fastfood.dto';
import { UpdateFastfoodDto } from './dto/update-fastfood.dto';

@Controller('fastfood')
export class FastfoodController {
  constructor(private readonly fastFoodService: FastFoodService) {}

  @Post()
  async create(@Body() createFastfoodDto: CreateFastfoodDto) {
    // Bazaga yangi mahsulot qo'shish kutiladi
    return await this.fastFoodService.create(createFastfoodDto);
  }

  @Get()
  async findAll() {
    // Barcha mahsulotlarni kutib olamiz
    return await this.fastFoodService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.fastFoodService.findOne({where:{id}});
    if (!product) {
      throw new NotFoundException(`ID: ${id} bo'lgan mahsulot topilmadi`);
    }
    return product;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateFastfoodDto: UpdateFastfoodDto) {
    const updatedProduct = await this.fastFoodService.update(id, updateFastfoodDto);
    if (!updatedProduct) {
      throw new NotFoundException(`Yangilash uchun ID: ${id} bo'lgan mahsulot topilmadi`);
    }
    return updatedProduct;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deletedProduct = await this.fastFoodService.remove(id);
    if (!deletedProduct) {
      throw new NotFoundException(`O'chirish uchun ID: ${id} bo'lgan mahsulot topilmadi`);
    }
    return { message: "Mahsulot muvaffaqiyatli o'chirildi", deletedProduct };
  }
}