import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import { User } from '../prisma/model/user.model';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((u) => u.email === email) || null;
  }

  async findOne(id: string): Promise<User | null> {
    return this.users.find((u) => u.id === id) || null;
  }

  async create(userData: {
    email: string;
    password: string;
    name?: string;
    role?: any;
  }): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: (userData.role as any) || 'STAFF',
      createdAt: new Date(),
      updatedAt: new Date(),
      invoices: [],
      subscriptions: [],
    };
    this.users.push(user);
    return user;
  }

  async update(id: string, data: Partial<User>): Promise<User | null> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    this.users[index] = { ...this.users[index], ...data, updatedAt: new Date() };
    return this.users[index];
  }

  async remove(id: string): Promise<boolean> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return false;
    this.users.splice(index, 1);
    return true;
  }
}
