import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { TypeUser } from "../dto/user.dto";
import { Vocabulary } from "src/vocabulary/schema/vocabulary.schema";

@Schema()
export class CustomDate {
    @Prop()
    day: number;

    @Prop()
    month: number;

    @Prop()
    year: number;
}

export class Studied {
    @Prop()
    numberOfCorrect: number;

    @Prop()
    numberOfError: number;

    @Prop()
    numberOfStudied: number;

    @Prop()
    date: CustomDate
}

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

    @Prop({ default: [] })
    forgettingVocabularies?: Vocabulary[];

    @Prop({ default: [] })
    studiedVocabularies?: Studied[];
}

export const UserSchema = SchemaFactory.createForClass(User)
