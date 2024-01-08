import { IsNotEmpty, IsString } from "class-validator"
import { SubtitleInterface } from "../schema/broadcast.schema"


export class BroadCastDto {
    @IsString()
    @IsNotEmpty()
    readonly urlVideo: string
    @IsNotEmpty()
    readonly englishSubtitle: SubtitleInterface[]
    @IsNotEmpty()
    readonly vietnameseSubtitle: SubtitleInterface[]
}