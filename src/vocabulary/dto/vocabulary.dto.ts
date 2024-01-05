import { IsNotEmpty, IsString, isNotEmpty } from "class-validator"
import { Types } from "mongoose"


export class VocabularyDto {
    @IsNotEmpty()
    @IsString()
    readonly english: string
    @IsNotEmpty()
    @IsString()
    readonly vietnamese: string
    readonly types: string[]
    @IsNotEmpty()
    readonly user_id: Types.ObjectId
}