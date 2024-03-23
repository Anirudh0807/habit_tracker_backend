import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('/:id')
    async getUserById(userId: string) {
        return this.usersService.getUserById(userId);
    }

    @Post('/create')
    async createUser(@Body() newUser: any) {
        return this.usersService.createUser(newUser);
    }
}
