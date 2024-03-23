import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Habit } from 'src/schema/habits.schema';
import { User } from 'src/schema/user.schema';

export class CreateHabitDto {
  name: string;
  userId: string; // Replace with appropriate type for userId
  emoji: string;
  days: string[];
}

@Injectable({})
export class HabitsService {
  constructor(
    @InjectModel(Habit.name) private habitModel: Model<Habit>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async createHabit(newHabit: any) {
    try {
      const user = await this.userModel.findById(newHabit.userId);
      if (!user) {
        return {
          error: 'User not found',
        };
      }

      const createdHabit = await this.habitModel.create(newHabit);
      return createdHabit;
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  async getHabitsById(userId: string) {
    try {
      const user = await this.userModel.findById(userId);

      if (!user) {
        return {
          error: 'User not found',
        };
      }

      const habits = await this.habitModel.find({ userId: userId });

      return habits;
    } catch (error) {
      return {
        message: 'Error getting habits by user id',
        error: error.message,
      };
    }
  }
}
