import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


@Schema({ timestamps: true })
export class Grammar {
    @Prop()
    structure: string

    @Prop()
    vietnamese: string

    @Prop()
    user_id: Types.ObjectId
}

export const GrammarSchema = SchemaFactory.createForClass(Grammar)