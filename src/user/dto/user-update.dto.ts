import { Vocabulary } from "src/vocabulary/schema/vocabulary.schema"
import { TypeUser } from "./user.dto"
import { Studied } from "../schema/user.schema"

export class UserUpdateDto {
    readonly username: string
    readonly password: string
    readonly fullname: string
    readonly image: string
    readonly email: string
    readonly type: TypeUser
    readonly forgettingVocabularies?: Vocabulary[];
    readonly studiedVocabularies?: Studied[];
}