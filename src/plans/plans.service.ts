import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { Plan } from '../prisma/model/plan.model';

@Injectable()
export class PlansService {
  private plans: Plan[] = [];

  findAll() {
    return this.plans.filter((p) => p.isActive);
  }

  findOne(id: string) {
    return this.plans.find((p) => p.id === id);
  }

  create(name: string, billingFrequency: string, minimumQuantity: number, dateAvailability?: Date, closeAutomatically = true, canBeManuallyClosed = false, canBePaused = false, canBeRenewed = false) {
    const plan: Plan = {
      id: crypto.randomUUID(),
      name,
      billingFrequency: billingFrequency as 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY',
      minimumQuantity,
      dateAvailability,
      closeAutomatically,
      canBeManuallyClosed,
      canBePaused,
      canBeRenewed,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      subscriptions: [],
    };
    this.plans.push(plan);
    return plan;
  }

  update(id: string, data: Partial<Plan>) {
    const index = this.plans.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new BadRequestException('Plan not found');
    }
    const updated = { ...this.plans[index], ...data };
    this.plans[index] = updated;
    return updated;
  }

  remove(id: string) {
    const index = this.plans.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new BadRequestException('Plan not found');
    }
    this.plans.splice(index, 1);
  }

  setStatus(id: string, isActive: boolean) {
    const plan = this.findOne(id);
    if (!plan) {
      throw new BadRequestException('Plan not found');
    }
    plan.isActive = isActive;
    plan.updatedAt = new Date();
    return plan;
  }
}