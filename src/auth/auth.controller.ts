import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { User } from '../user/schema/user.schema';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { UserSignInDto } from '../user/dto/user-signin.dto';
import { Response } from 'express';
import { UserAuthDto } from '../user/dto/userAuth.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('sign-up')
    async signup(@Body() user: UserDto): Promise<User> {
        return await this.authService.signup(user)
    }

    @Post('sign-up-with-auth')
    async signupWithAuth(@Body() user: UserAuthDto): Promise<User> {
        return await this.authService.signupWithAuth(user)
    }

    @Post('sign-in')
    async signin(@Body() userSignin: UserSignInDto): Promise<{ status: number, metadata: any }> {
        return await this.authService.signin(userSignin.username, userSignin.password)
    }

    @Get('check-token')
    async checkToken(@Req() req: Request): Promise<any> {
        const user = await this.authService.checkToken((req as any).auth.user_id)
        const auth = (req as any).auth
        return { user, auth }
    }
}
