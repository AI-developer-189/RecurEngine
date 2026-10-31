import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Discount, Subscription } from '../prisma/model/discount.model';

@Injectable()
export class DiscountsService {
  private discounts: Discount[] = [];

  findAll() {
    return this.discounts.filter((d) => d.status === 'ACTIVE');
  }

  findOne(id: string) {
    return this.discounts.find((d) => d.id === id);
  }

  create(code: string, type: 'FIXED' | 'PERCENTAGE', value: number, minPurchaseAmount: number, minQuantity: number, startDate: Date, endDate: Date, maxUsages?: number, applicableTo: 'global' | string[] = 'global') {
    const discount: Discount = {
      id: crypto.randomUUID(),
      code,
      type,
      value,
      minPurchaseAmount,
      minQuantity,
      startDate,
      endDate,
      maxUsages,
      currentUsages: 0,
      status: 'ACTIVE',
      applicableTo,
      createdById: '',
      subscriptions: [],
    };

    this.discounts.push(discount);
    return discount;
  }

  applyDiscount(subscriptionId: string, invoiceId: string, discountCode: string) {
    const discount = this.discounts.find((d) => d.code === discountCode);
    if (!discount) {
      throw new BadRequestException('Discount not found');
    }

    // Check if discount is valid
    const now = new Date();
    if (now < discount.startDate) {
      throw new BadRequestException('Discount not yet active');
    }
    if (now > discount.endDate) {
      discount.status = 'EXPIRED';
      throw new BadRequestException('Discount has expired');
    }
    if (discount.maxUsages && discount.currentUsages >= discount.maxUsages) {
      discount.status = 'DEPLETED';
      throw new BadRequestException('Discount usage limit depleted');
    }

    // Check minimum purchase amount
    // Would need to get the invoice/subscription details

    // Apply discount
    discount.currentUsages += 1;

    return {
      discount,
      message: `Discount ${discount.code} applied successfully`,
    };
  }

  resetUsage(discountId: string) {
    const discount = this.findOne(discountId);
    if (!discount) {
      throw new BadRequestException('Discount not found');
    }
    discount.currentUsages = 0;
    discount.status = 'ACTIVE';
    return discount;
  }
}