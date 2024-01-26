import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mongoose, Types } from "mongoose";

export enum TypeText {
    TEXT = 'text',
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    IMAGE = 'image',
    TABLE = 'table'
}

export interface ContentInterface {
    type: TypeText,
    content: string | {
        row: number,
        column: number,
        content: string[]
    }
}

@Schema({ timestamps: true })
export class Note {
    @Prop()
    title: string

    @Prop()
    folder: Types.ObjectId

    @Prop({ default: [] })
    content: ContentInterface[]

    @Prop()
    user_id: Types.ObjectId
}

export const NoteSchema = SchemaFactory.createForClass(Note)