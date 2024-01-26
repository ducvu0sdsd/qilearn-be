import { IsNotEmpty, IsString } from "class-validator"
import { ContentInterface } from "../schema/note.schema"
import { Types } from "mongoose"


export class NoteDto {
    readonly _id?: string
    @IsString()
    readonly title: string
    @IsNotEmpty()
    @IsString()
    readonly folder: Types.ObjectId
    readonly content: ContentInterface[]
    @IsNotEmpty()
    readonly user_id: Types.ObjectId
}