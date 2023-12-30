import { IsNotEmpty, IsString } from "class-validator"
import { TypeUser } from "./user.dto"


export class UserAuthDto {
    @IsNotEmpty()
    @IsString()
    readonly fullname: string
    @IsNotEmpty()
    @IsString()
    readonly image: string
    @IsNotEmpty()
    @IsString()
    readonly email: string
    @IsNotEmpty()
    readonly type: TypeUser
}