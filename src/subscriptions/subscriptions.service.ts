import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Subscription, LineItem } from '../prisma/model/subscription.model';

@Injectable()
export class SubscriptionsService {
  private subscriptions: Subscription[] = [];
  private lineItems: LineItem[] = [];

  findAll() {
    return this.subscriptions;
  }

  findOne(id: string) {
    return this.subscriptions.find((s) => s.id === id);
  }

  createFromQuote(customerId: string, planId: string) {
    const subscription: Subscription = {
      id: crypto.randomUUID(),
      uniqueIdentifier: `SUB-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      customerId,
      planId,
      startDate: new Date(),
      status: 'Draft',
      paymentTerms: 'Net 30',
      taxRate: 0.10,
      lineItems: [],
      invoices: [],
      payments: [],
    };

    this.subscriptions.push(subscription);
    return subscription;
  }

  transitionStatus(subscriptionId: string, newStatus: string) {
    const subscription = this.findOne(subscriptionId);
    if (!subscription) {
      throw new BadRequestException('Subscription not found');
    }

    const validTransitions: Record<string, string[]> = {
      Draft: ['Quotation'],
      Quotation: ['Confirmed', 'Closed'],
      Confirmed: ['Active', 'Closed'],
      Active: ['Closed'],
    };

    const allowedNextStates = validTransitions[subscription.status];
    if (!allowedNextStates || !allowedNextStates.includes(newStatus)) {
      throw new BadRequestException(
        `Invalid transition from ${subscription.status} to ${newStatus}. Allowed: ${allowedNextStates.join(', ')}`
      );
    }

    subscription.status = newStatus;
    return subscription;
  }

  addLineItem(subscriptionId: string, productId: string, quantity: number, unitPrice: number) {
    const subscription = this.findOne(subscriptionId);
    if (!subscription) {
      throw new BadRequestException('Subscription not found');
    }

    const totalAmount = unitPrice * quantity;
    const lineItem: LineItem = {
      id: crypto.randomUUID(),
      subscriptionId,
      productId,
      quantity,
      unitPrice,
      taxAmount: 0,
      totalAmount,
      discountApplied: 0,
    };

    subscription.lineItems.push(lineItem);
    this.lineItems.push(lineItem);
    return lineItem;
  }
}