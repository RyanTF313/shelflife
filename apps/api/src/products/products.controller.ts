import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { type Product } from '@shelflife/shared';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Omit<Product, 'id'>>) {
    return this.productsService.update(id, body);
  }
}
