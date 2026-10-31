export declare class DiscountsService {
    private discounts;
    findAll(): Discount[];
    findOne(id: string): any;
    create(code: string, type: 'FIXED' | 'PERCENTAGE', value: number, minPurchaseAmount: number, minQuantity: number, startDate: Date, endDate: Date, maxUsages?: number, applicableTo?: 'global' | string[]): Discount;
    applyDiscount(subscriptionId: string, invoiceId: string, discountCode: string): {
        discount: any;
        message: string;
    };
    resetUsage(discountId: string): any;
}
