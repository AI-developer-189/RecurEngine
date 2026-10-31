export declare class InvoicesService {
    private invoices;
    private payments;
    findAll(): Invoice[];
    findOne(id: string): any;
    generateFromSubscription(subscriptionId: string): Invoice;
    confirmInvoice(invoiceId: string): any;
    payInvoice(invoiceId: string, paymentDto: {
        amount: number;
        paymentMethod: string;
        note?: string;
    }): {
        invoice: any;
        payment: Payment;
    };
    private getCustomer;
    private getSubscription;
    private subscriptions;
}
