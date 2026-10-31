import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { RolesGuard } from '../auth/roles.guard';
import { USER_ROLES } from '../decorators/user-roles.decorator';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private subscriptionsService: SubscriptionsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  create(@Body() dto: { customerId: string; planId: string }) {
    return this.subscriptionsService.createFromQuote(dto.customerId, dto.planId);
  }

  @Post(':id/transition')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  transitionStatus(
    @Param('id') subscriptionId: string,
    @Body() dto: { status: string }
  ) {
    return this.subscriptionsService.transitionStatus(subscriptionId, dto.status);
  }

  @Post(':id/items')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  addLineItem(
    @Param('id') subscriptionId: string,
    @Body() dto: { productId: string; quantity: number; unitPrice: number }
  ) {
    return this.subscriptionsService.addLineItem(subscriptionId, dto.productId, dto.quantity, dto.unitPrice);
  }

  @Get()
  findAll() {
    return this.subscriptionsService.findAll();
  }
}