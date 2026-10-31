import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { USER_ROLES } from '../decorators/user-roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('register')
  async register(@Body() signupDto: { email: string; password: string; name: string; role?: string }) {
    return this.usersService.create(signupDto);
  }

  @Get('me')
  @UseGuards(AuthGuard('local'), RolesGuard)
  @USER_ROLES('ADMIN', 'STAFF', 'CUSTOMER')
  async getMe(@Body() user: any) {
    return user;
  }

  @Get(':id')
  @UseGuards(AuthGuard('local'), RolesGuard)
  @USER_ROLES('ADMIN')
  async getById(@Param('id') id: string, @Body() user: any) {
    if (user.role !== 'ADMIN') {
      throw new Error('Access denied - admin only');
    }
    return this.usersService.findOne(id);
  }
}