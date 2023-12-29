import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { User } from 'src/user/schema/user.schema';
import { AuthService } from './auth.service';
import { UserDto } from '../user/dto/user.dto';
import { UserSignInDto } from '../user/dto/user-signin.dto';
import { Response } from 'express';
import { UserAuthDto } from 'src/user/dto/userAuth.dto';

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
    async signin(@Body() userSignin: UserSignInDto, @Res(({ passthrough: true })) res: Response): Promise<{ status: number, metadata: any }> {
        return await this.authService.signin(userSignin.username, userSignin.password, res)
    }

    @Get('check-token')
    async checkToken(@Req() req: Request): Promise<User> {
        const user_id = (req as any).user_id;
        return await this.authService.checkToken(user_id)
    }
}
