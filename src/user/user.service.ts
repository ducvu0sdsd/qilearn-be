import { Injectable } from '@nestjs/common';
import { User } from './schema/user.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from './user.controller';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name)
        private userSchema: mongoose.Model<User>
    ) { }

    async getAllUser(): Promise<User[]> {
        const users = await this.userSchema.find()
        return users
    }

    async getUserByUserName(username: string) {
        return await this.userSchema.findOne({ username })
    }

    async getUserByEmail(email: string) {
        return await this.userSchema.findOne({ email })
    }

    async getUserByID(id: string) {
        return await this.userSchema.findById(id)
    }
}
