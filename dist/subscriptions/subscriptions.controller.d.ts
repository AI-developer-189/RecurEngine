import { SubscriptionsService } from './subscriptions.service';
export declare class SubscriptionsController {
    private subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    create(dto: {
        customerId: string;
        planId: string;
    }): Subscription;
    transitionStatus(subscriptionId: string, dto: {
        status: string;
    }): any;
    addLineItem(subscriptionId: string, dto: {
        productId: string;
        quantity: number;
        unitPrice: number;
    }): LineItem;
    findAll(): Subscription[];
}
