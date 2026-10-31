import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { RolesGuard } from '../auth/roles.guard';
import { USER_ROLES } from '../decorators/user-roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN')
  create(@Body() dto: { name: string; type?: string; salesPrice: number; costPrice: number; notes?: string }) {
    return this.productsService.create(dto.name, dto.type, dto.salesPrice, dto.costPrice, dto.notes);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post(':id/variants')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN')
  addVariant(
    @Param('id') productId: string,
    @Body() dto: { name: string; priceAdjustment: number }
  ) {
    return this.productsService.addVariant(productId, dto.name, dto.priceAdjustment);
  }
}