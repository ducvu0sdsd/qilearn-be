import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import e, { NextFunction, Request, Response } from "express";
import { UserService } from "../../user/user.service";
import * as crypto from 'crypto';
import { Types } from "mongoose";

@Injectable()
export class AuthMiddleware implements NestMiddleware {

    constructor(
        private jwtService: JwtService,
    ) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const accessToken = (req.headers as any).accesstoken
        const refreshToken = (req.headers as any).refreshtoken
        if (!accessToken) {
            throw new HttpException({ message: 'Not Found AccessToken' }, HttpStatus.NOT_FOUND)
        }

        if (!refreshToken) {
            throw new HttpException({ message: 'Not Found RefreshToken' }, HttpStatus.NOT_FOUND)
        }

        let auth = { accessToken, refreshToken, user_id: null }

        try {
            const decodedToken = await this.jwtService.verify(accessToken, {
                secret: process.env.SECRET_KEY
            })
            console.log(new Date(), new Date(decodedToken.exp))
            auth = { accessToken, refreshToken, user_id: decodedToken.user_id }
        } catch (error) {
            //AccessToken has expired
            const currentTimestamp = new Date().getTime()
            try {
                const decodedRefreshToken = await this.jwtService.verify(refreshToken, {
                    secret: process.env.REFRESH_SECRET_KEY
                })
                const expR = decodedRefreshToken.exp * 1000;
                const payload = { user_id: decodedRefreshToken.user_id }
                const newAccessToken: string = await this.jwtService.sign(payload, {
                    secret: process.env.SECRET_KEY,
                    expiresIn: process.env.EXPIRES_IN
                })
                const newRefreshToken: string = await this.jwtService.sign(payload, {
                    secret: process.env.REFRESH_SECRET_KEY,
                    expiresIn: `${(expR - currentTimestamp) / 1000}s`
                })
                auth = { accessToken: newAccessToken, refreshToken: newRefreshToken, user_id: decodedRefreshToken.user_id }
            } catch (error) {
                //RefreshToken has expired
                throw new HttpException({ message: `RefreshToken has expired` }, HttpStatus.FORBIDDEN)
            }
        } finally {
            (req as any).auth = auth
            next()
        }
    }
}