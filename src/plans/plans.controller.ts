import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { PlansService } from './plans.service';
import { RolesGuard } from '../auth/roles.guard';
import { USER_ROLES } from '../decorators/user-roles.decorator';

@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Post()
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN')
  create(
    @Body() dto: {
      name: string;
      billingFrequency: 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';
      minimumQuantity: number;
      dateAvailability?: Date;
      closeAutomatically?: boolean;
      canBeManuallyClosed?: boolean;
      canBePaused?: boolean;
      canBeRenewed?: boolean;
    }
  ) {
    return this.plansService.create(
      dto.name,
      dto.billingFrequency,
      dto.minimumQuantity,
      dto.dateAvailability,
      dto.closeAutomatically,
      dto.canBeManuallyClosed,
      dto.canBePaused,
      dto.canBeRenewed
    );
  }

  @Get()
  findAll() {
    return this.plansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @USER_ROLES('ADMIN')
  setStatus(@Param('id') id: string, @Body() dto: { isActive: boolean }) {
    return this.plansService.setStatus(id, dto.isActive);
  }
}