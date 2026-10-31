export declare class SubscriptionsService {
    private subscriptions;
    private lineItems;
    findAll(): Subscription[];
    findOne(id: string): any;
    createFromQuote(customerId: string, planId: string): Subscription;
    transitionStatus(subscriptionId: string, newStatus: string): any;
    addLineItem(subscriptionId: string, productId: string, quantity: number, unitPrice: number): LineItem;
}
