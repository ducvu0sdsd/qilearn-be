import { Controller, Get } from '@nestjs/common';
import { User } from './schema/user.schema';
import { UserService } from './user.service';

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
}
