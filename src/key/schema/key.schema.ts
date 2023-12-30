import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Key {
    @Prop()
    publicKey: string
    @Prop()
    refreshToken: string
    @Prop()
    status: boolean
    @Prop()
    user_id: Types.ObjectId
}

export const KeySchema = SchemaFactory.createForClass(Key)