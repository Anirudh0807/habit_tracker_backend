import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createUser(newUser: any) {
    try {
      const user = await this.userModel.findOne({ email: newUser.email });
      if (user) {
        return {
          error: 'User already exists',
        };
      }

      if (newUser.password) {
        newUser.password = await bcrypt.hash(
          newUser.password,
          +process.env.HASH_ROUNDS,
        );
      }

      const createdUser = await this.userModel.create(newUser);

      return createdUser;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getUserById(userId: string) {
    const existingUser = await this.userModel.findById({ userId });

    if (!existingUser) {
      return {
        error: 'User not found',
      };
    }

    return existingUser;
  }

  async getUserByEmail(email: string) {
    return this.userModel.findOne({ email: email });
  }
}