import { IsNotEmpty, IsString } from "class-validator"
import { Vocabulary } from "src/vocabulary/schema/vocabulary.schema"
import { Studied } from "../schema/user.schema"


export enum TypeUser {
    NORMAL = 'normal',
    GOOGLE = 'google',
    GITHUB = 'github'
}

export class UserDto {
    @IsString()
    @IsNotEmpty()
    readonly username: string
    @IsString()
    @IsNotEmpty()
    readonly password: string
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
    readonly forgettingVocabularies?: Vocabulary[];
    readonly studiedVocabularies?: Studied[];
}