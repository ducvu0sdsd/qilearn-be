import { IsNotEmpty, IsString } from "class-validator"
import { Types } from "mongoose"

export class FolderDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    readonly user_id: Types.ObjectId
}