import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FastfoodService } from './fastfood.service';
import { CreateFastfoodDto } from './dto/create-fastfood.dto';
import { UpdateFastfoodDto } from './dto/update-fastfood.dto';

@Controller('fastfood')
export class FastfoodController {
  constructor(private readonly fastfoodService: FastfoodService) {}

  @Post()
  create(@Body() createFastfoodDto: CreateFastfoodDto) {
  }

  @Get()
  findAll() {
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFastfoodDto: UpdateFastfoodDto) {
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
  }
}