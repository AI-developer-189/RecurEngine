import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../prisma/model/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  async findOne(id: string) {
    return this.userModel.findByPk(id);
  }

  async create(userData: {
    email: string;
    password: string;
    name?: string;
    role?: string;
  }) {
    return this.userModel.create(userData);
  }

  async update(id: string, data: any) {
    return this.userModel.update(data, { where: { id } });
  }

  async remove(id: string) {
    return this.userModel.destroy({ where: { id } });
  }
}