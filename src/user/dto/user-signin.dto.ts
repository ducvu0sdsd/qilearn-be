import { IsNotEmpty, IsNumber, IsString } from "class-validator"


export class UserSignInDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string
    @IsNotEmpty()
    @IsString()
    readonly password: string
}