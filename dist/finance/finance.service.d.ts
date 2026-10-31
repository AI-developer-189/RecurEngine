export declare class FinanceService {
    /**
     * Get active subscriptions count and total MRR/ARR
     */
    getActiveSubscriptions(filters?: {
        customerId?: string;
        planId?: string;
    }): Promise<{
        count: number;
        totalRecurringRevenue: number;
        subscriptions: never[];
    }>;
    /**
     * Get collected revenue (total paid invoices)
     */
    getCollectedRevenue(filters?: {
        startDate?: Date;
        endDate?: Date;
    }): Promise<{
        totalRevenue: number;
        totalInvoices: number;
    }>;
    /**
     * Get overdue invoices with customer details
     */
    getOverdueInvoices(): Promise<{
        overdueInvoices: never[];
        totalOverdue: number;
        totalOverdueAmount: number;
    }>;
    /**
     * Get finance summary dashboard data
     * Optimized single query for <2 second load time
     */
    getFinanceSummary(): Promise<{
        activeSubscriptions: number;
        totalRevenue: number;
        monthlyRecurringRevenue: number;
        overdueInvoiceCount: number;
        overdueAmount: number;
        totalInvoices: number;
        paidInvoices: number;
        pendingInvoices: number;
    }>;
    /**
     * Get revenue by period (monthly, quarterly, yearly)
     */
    getRevenueByPeriod(period: 'monthly' | 'quarterly' | 'yearly', startDate: Date, endDate: Date): Promise<never[]>;
    /**
     * Get top customers by revenue
     */
    getTopCustomers(limit?: number): Promise<never[]>;
}
