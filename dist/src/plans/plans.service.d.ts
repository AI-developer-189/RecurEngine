import { Plan } from '../prisma/model/plan.model';
export declare class PlansService {
    private plans;
    findAll(): Plan[];
    findOne(id: string): any;
    create(name: string, billingFrequency: string, minimumQuantity: number, dateAvailability?: Date, closeAutomatically?: boolean, canBeManuallyClosed?: boolean, canBePaused?: boolean, canBeRenewed?: boolean): Plan;
    update(id: string, data: Partial<Plan>): any;
    remove(id: string): void;
    setStatus(id: string, isActive: boolean): any;
}
