import { Types } from "mongoose"


export class KeyDto {
    readonly _id: Types.ObjectId
    readonly publicKey: string
    readonly refreshToken: string
    readonly status: boolean
    readonly user_id: Types.ObjectId
}