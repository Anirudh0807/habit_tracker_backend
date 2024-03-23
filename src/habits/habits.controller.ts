import { Controller, Get, Param, Post, Request } from '@nestjs/common';
import { HabitsService } from './habits.service';

@Controller('habits')
export class HabitsController {
  constructor(private habitsService: HabitsService) {}

  @Post('/create')
  async createHabit(@Request() newHabit: any) {
    return this.habitsService.createHabit(newHabit.body);
  }

  @Get('get/:id')
  async getHabitsById(@Param('id') id: string) {
    return this.habitsService.getHabitsById(id);
  }
}
