import { InvoicesService } from './invoices.service';
export declare class InvoicesController {
    private invoicesService;
    constructor(invoicesService: InvoicesService);
    generate(subscriptionId: string): Invoice;
    confirm(invoiceId: string): any;
    pay(invoiceId: string, dto: {
        amount: number;
        paymentMethod: string;
        note?: string;
    }): {
        invoice: any;
        payment: Payment;
    };
    findAll(): Invoice[];
}
