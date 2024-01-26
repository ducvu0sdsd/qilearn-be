import { Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Mongoose, Types } from "mongoose";

@Schema({ timestamps: true })
export class Folder {
    @Prop()
    name: string
    @Prop()
    user_id: Types.ObjectId
}

export const FolderSchema = SchemaFactory.createForClass(Folder)