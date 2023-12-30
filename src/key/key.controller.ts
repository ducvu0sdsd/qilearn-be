import { Controller, Delete, Param, Req } from '@nestjs/common';
import { Types } from 'mongoose';
import { KeyService } from './key.service';
import { Request, request } from 'express';

@Controller('keys')
export class KeyController {

    constructor(
        private keyService: KeyService
    ) { }

    @Delete()
    async deleteKey(@Req() request): Promise<boolean> {
        const { user_id, privateKey, accessToken, refreshToken } = request.cookies
        return await this.keyService.deleteKey(refreshToken)
    }
}
