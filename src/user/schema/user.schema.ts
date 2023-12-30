import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { TypeUser } from "../dto/user.dto";


@Schema({ timestamps: true })
export class User {

    @Prop()
    username?: string

    @Prop()
    password?: string

    @Prop()
    fullname: string

    @Prop()
    image: string

    @Prop()
    email: string

    @Prop()
    type: TypeUser
}

export const UserSchema = SchemaFactory.createForClass(User)