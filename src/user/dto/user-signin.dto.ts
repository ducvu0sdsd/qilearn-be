import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class UserSignInDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string
    @IsString()
    readonly password: string
}