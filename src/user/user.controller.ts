import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserUpdateDto } from './dto/user-update.dto';

export interface Result<T> {
    status: number,
    metadata: {
        message?: string
        data?: T | any
    }
}

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    async getAllUser(): Promise<User[]> {
        return this.userService.getAllUser()
    }

    @Put(':id')
    async updateUser(@Body() user: UserUpdateDto, @Param('id') id: string): Promise<User> {
        return this.userService.updateUser(id, user)
    }
}
