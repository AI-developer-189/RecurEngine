import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { RolesGuard } from '../auth/roles.guard';
import { USER_ROLES } from '../decorators/user-roles.decorator';

@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Post('generate/:subscriptionId')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  generate(@Param('subscriptionId') subscriptionId: string) {
    return this.invoicesService.generateFromSubscription(subscriptionId);
  }

  @Post(':id/confirm')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  confirm(@Param('id') invoiceId: string) {
    return this.invoicesService.confirmInvoice(invoiceId);
  }

  @Post(':id/pay')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  pay(@Param('id') invoiceId: string, @Body() dto: { amount: number; paymentMethod: string; note?: string }) {
    return this.invoicesService.payInvoice(invoiceId, dto);
  }

  @Get()
  findAll() {
    return this.invoicesService.findAll();
  }
}