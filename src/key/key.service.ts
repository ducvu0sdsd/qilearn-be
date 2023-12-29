import { Injectable, Type } from '@nestjs/common';
import mongoose from 'mongoose';
import { Key } from './schema/key.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { KeyDto } from './dto/key.dto';

@Injectable()
export class KeyService {

    constructor(
        @InjectModel(Key.name)
        private keySchema: mongoose.Model<Key>
    ) { }

    async createKey(key: Key): Promise<Key> {
        return await this.keySchema.create(key)
    }

    async findByRefreshToken(refreshToken: string): Promise<Key> {
        return await this.keySchema.findOne({ refreshToken })
    }

    async updateKey(key: KeyDto, id: Types.ObjectId): Promise<Key> {
        return await this.keySchema.findByIdAndUpdate(id, key)
    }

    async deleteKey(refreshToken: string): Promise<boolean> {
        try {
            await this.keySchema.findOneAndDelete({ refreshToken })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async deleteAllKeyByUser(user_id: Types.ObjectId): Promise<boolean> {
        try {
            await this.keySchema.deleteMany({ user_id })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}
