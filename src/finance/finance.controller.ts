import { Controller, Get, Body, Param, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { RolesGuard } from '../auth/roles.guard';
import { USER_ROLES } from '../decorators/user-roles.decorator';

@Controller('finance')
export class FinanceController {
  constructor(private financeService: FinanceService) {}

  @Get('summary')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  async getSummary(@Body() filters?: any) {
    return this.financeService.getFinanceSummary();
  }

  @Get('active-subscriptions')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  async getActiveSubscriptions(@Body() filters?: any) {
    return this.financeService.getActiveSubscriptions(filters);
  }

  @Get('collected-revenue')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  async getCollectedRevenue(@Body() filters?: { startDate: Date; endDate: Date }) {
    return this.financeService.getCollectedRevenue(filters);
  }

  @Get('overdue-invoices')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  async getOverdueInvoices() {
    return this.financeService.getOverdueInvoices();
  }

  @Get('revenue-by-period')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  async getRevenueByPeriod(@Body() dto: { period: 'monthly' | 'quarterly' | 'yearly'; startDate: Date; endDate: Date }) {
    return this.financeService.getRevenueByPeriod(dto.period, dto.startDate, dto.endDate);
  }

  @Get('top-customers')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF')
  async getTopCustomers(@Body() dto: { limit?: number }) {
    return this.financeService.getTopCustomers(dto.limit || 10);
  }
}