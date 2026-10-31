import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { DiscountsService } from './discounts.service';
import { RolesGuard } from '../auth/roles.guard';
import { USER_ROLES } from '../decorators/user-roles.decorator';

@Controller('discounts')
export class DiscountsController {
  constructor(private discountsService: DiscountsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN')
  create(@Body() dto: {
    code: string;
    type: 'FIXED' | 'PERCENTAGE';
    value: number;
    minPurchaseAmount: number;
    minQuantity: number;
    startDate: Date;
    endDate: Date;
    maxUsages?: number;
    applicableTo?: 'global' | string[];
  }) {
    return this.discountsService.create(
      dto.code,
      dto.type,
      dto.value,
      dto.minPurchaseAmount,
      dto.minQuantity,
      dto.startDate,
      dto.endDate,
      dto.maxUsages,
      dto.applicableTo
    );
  }

  @Post('apply')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  apply(@Body() dto: { subscriptionId: string; invoiceId: string; discountCode: string }) {
    return this.discountsService.applyDiscount(
      dto.subscriptionId,
      dto.invoiceId,
      dto.discountCode
    );
  }

  @Post('reset/:id')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN')
  resetUsage(@Param('id') discountId: string) {
    return this.discountsService.resetUsage(discountId);
  }

  @Get()
  findAll() {
    return this.discountsService.findAll();
  }
}