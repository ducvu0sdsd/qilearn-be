import { IsNotEmpty, IsString } from "class-validator"
import { Types } from "mongoose"


export class GrammarDto {
    @IsNotEmpty()
    @IsString()
    readonly structure: string
    @IsNotEmpty()
    @IsString()
    readonly vietnamese: string
    @IsNotEmpty()
    readonly user_id: Types.ObjectId
}