import { DiscountsService } from './discounts.service';
export declare class DiscountsController {
    private discountsService;
    constructor(discountsService: DiscountsService);
    create(dto: {
        code: string;
        type: 'FIXED' | 'PERCENTAGE';
        value: number;
        minPurchaseAmount: number;
        minQuantity: number;
        startDate: Date;
        endDate: Date;
        maxUsages?: number;
        applicableTo?: 'global' | string[];
    }): Discount;
    apply(dto: {
        subscriptionId: string;
        invoiceId: string;
        discountCode: string;
    }): {
        discount: any;
        message: string;
    };
    resetUsage(discountId: string): any;
    findAll(): Discount[];
}
