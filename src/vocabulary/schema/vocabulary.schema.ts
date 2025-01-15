import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema({ timestamps: true })
export class Vocabulary {
    @Prop()
    english: string;

    @Prop()
    vietnamese: string;

    @Prop({ type: [String], default: [] })
    types: string[];

    @Prop()
    user_id: Types.ObjectId

    @Prop({default : false})
    forget : Boolean
}

export const VocabularySchema = SchemaFactory.createForClass(Vocabulary);
