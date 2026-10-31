import { FinanceService } from './finance.service';
export declare class FinanceController {
    private financeService;
    constructor(financeService: FinanceService);
    getSummary(filters?: any): Promise<{
        activeSubscriptions: number;
        totalRevenue: number;
        monthlyRecurringRevenue: number;
        overdueInvoiceCount: number;
        overdueAmount: number;
        totalInvoices: number;
        paidInvoices: number;
        pendingInvoices: number;
    }>;
    getActiveSubscriptions(filters?: any): Promise<{
        count: number;
        totalRecurringRevenue: number;
        subscriptions: never[];
    }>;
    getCollectedRevenue(filters?: {
        startDate: Date;
        endDate: Date;
    }): Promise<{
        totalRevenue: number;
        totalInvoices: number;
    }>;
    getOverdueInvoices(): Promise<{
        overdueInvoices: never[];
        totalOverdue: number;
        totalOverdueAmount: number;
    }>;
    getRevenueByPeriod(dto: {
        period: 'monthly' | 'quarterly' | 'yearly';
        startDate: Date;
        endDate: Date;
    }): Promise<never[]>;
    getTopCustomers(dto: {
        limit?: number;
    }): Promise<never[]>;
}
