import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Invoice, Payment } from '../prisma/model/invoice.model';

@Injectable()
export class InvoicesService {
  private invoices: Invoice[] = [];
  private payments: Payment[] = [];

  findAll() {
    return this.invoices;
  }

  findOne(id: string) {
    return this.invoices.find((i) => i.id === id);
  }

  generateFromSubscription(subscriptionId: string) {
    const subscription = this.getSubscription(subscriptionId);
    if (!subscription) {
      throw new BadRequestException('Subscription not found');
    }

    const customer = this.getCustomer(subscription.customerId);
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }

    const subtotal = subscription.lineItems.reduce(
      (sum, item) => sum + item.totalAmount,
      0
    );

    const taxAmount = subtotal * subscription.taxRate;
    const totalAmount = subtotal + taxAmount;

    const invoice: Invoice = {
      id: crypto.randomUUID(),
      uniqueIdentifier: `INV-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      customerId: subscription.customerId,
      subscriptionId,
      status: 'DRAFT',
      issueDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      subtotal,
      taxAmount,
      totalAmount,
      discountApplied: 0,
      notes: '',
      payments: [],
    };

    this.invoices.push(invoice);
    return invoice;
  }

  confirmInvoice(invoiceId: string) {
    const invoice = this.findOne(invoiceId);
    if (!invoice) {
      throw new BadRequestException('Invoice not found');
    }

    if (invoice.status !== 'DRAFT') {
      throw new BadRequestException('Only draft invoices can be confirmed');
    }

    invoice.status = 'CONFIRMED';
    return invoice;
  }

  payInvoice(invoiceId: string, paymentDto: { amount: number; paymentMethod: string; note?: string }) {
    const invoice = this.findOne(invoiceId);
    if (!invoice) {
      throw new BadRequestException('Invoice not found');
    }

    if (invoice.status !== 'CONFIRMED') {
      throw new BadRequestException('Only confirmed invoices can be paid');
    }

    if (paymentDto.amount > invoice.totalAmount) {
      throw new BadRequestException('Payment amount exceeds invoice total');
    }

    // Mark as paid if full amount paid
    if (paymentDto.amount >= invoice.totalAmount) {
      invoice.status = 'PAID';
    }

    const payment: Payment = {
      id: crypto.randomUUID(),
      invoiceId,
      amount: paymentDto.amount,
      paymentMethod: paymentDto.paymentMethod,
      paymentDate: new Date(),
      note: paymentDto.note,
    };

    this.payments.push(payment);
    return { invoice, payment };
  }

  private getCustomer(customerId: string) {
    // Would fetch from DB in real implementation
    return { id: customerId, email: 'test@test.com' };
  }

  private getSubscription(subscriptionId: string) {
    // Would fetch from DB in real implementation
    return this.subscriptions.find((s) => s.id === subscriptionId) || null;
  }

  private subscriptions: any[] = [];
}