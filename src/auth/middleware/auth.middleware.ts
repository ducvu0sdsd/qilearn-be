import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import e, { NextFunction, Request, Response } from "express";
import { KeyService } from "../../key/key.service";
import { UserService } from "../../user/user.service";
import * as crypto from 'crypto';
import { KeyDto } from "../../key/dto/key.dto";
import { Key } from "../../key/schema/key.schema";
import { Types } from "mongoose";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private jwtService: JwtService,
        private keyService: KeyService
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const { user_id, privateKey, accessToken, refreshToken } = req.cookies

        // check accessToken
        if (!accessToken) {
            // remember to send Email discover crack
            throw new HttpException({ message: "Not Found AccessToken" }, HttpStatus.NOT_FOUND)
        }
        const key: any = await this.keyService.findByRefreshToken(refreshToken)
        if (!key) {
            throw new HttpException({ message: "Not Found Key" }, HttpStatus.NOT_FOUND)
        }
        let decodedToken
        try {
            decodedToken = this.jwtService.verify(accessToken, {
                publicKey: key.publicKey,
                algorithms: ['RS256']
            })

        } catch (error) {
            // Access Token has expired
            try {
                if (!refreshToken) {

                    throw new HttpException({ message: "Not Found RefreshToken" }, HttpStatus.NOT_FOUND)
                }

                const currentTimestamp = new Date().getTime()
                const decodedRefreshToken = this.jwtService.verify(refreshToken, {
                    publicKey: key.publicKey,
                    algorithms: ['RS256']
                })
                const expRefresh = decodedRefreshToken.exp * 1000

                // Generate AccessToken
                const newAccessToken = this.jwtService.sign({ user_id }, {
                    privateKey: privateKey,
                    expiresIn: "1h",
                    algorithm: 'RS256'
                })

                // Generate RefreshToken
                const newRefreshToken = this.jwtService.sign({ user_id }, {
                    privateKey: privateKey,
                    expiresIn: expRefresh - currentTimestamp,
                    algorithm: 'RS256'
                })

                // set Key and Update Key to Mongodb
                key.refreshToken = newRefreshToken
                await this.keyService.updateKey(key, key._id)

                // Save privateKey AccessToken RefreshToken to Cookie
                res.cookie('privateKey', privateKey, { httpOnly: false })
                res.cookie('accessToken', newAccessToken, { httpOnly: false })
                res.cookie('refreshToken', newRefreshToken, { httpOnly: false })
                res.cookie('user_id', user_id, { httpOnly: false })
            } catch (error) {
                await this.keyService.deleteKey(refreshToken)
                throw new HttpException({ message: "RefreshToken Has Expired" }, HttpStatus.FORBIDDEN)
            }
        }
        (req as any).user_id = decodedToken.user_id;
        next()
    }
}