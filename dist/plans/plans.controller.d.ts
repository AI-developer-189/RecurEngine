import { PlansService } from './plans.service';
export declare class PlansController {
    private plansService;
    constructor(plansService: PlansService);
    create(dto: {
        name: string;
        billingFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
        minimumQuantity: number;
        dateAvailability?: Date;
        closeAutomatically?: boolean;
        canBeManuallyClosed?: boolean;
        canBePaused?: boolean;
        canBeRenewed?: boolean;
    }): Plan;
    findAll(): Plan[];
    findOne(id: string): any;
    setStatus(id: string, dto: {
        isActive: boolean;
    }): any;
}
