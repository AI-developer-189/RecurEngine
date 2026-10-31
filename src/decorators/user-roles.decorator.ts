import { SetMetadata } from '@nestjs/common';

export const USER_ROLES = (...roles: string[]) => SetMetadata('roles', roles);