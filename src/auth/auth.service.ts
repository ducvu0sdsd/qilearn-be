import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Mongoose, Types } from 'mongoose';
import { TypeUser, UserDto } from '../user/dto/user.dto';
import { User, UserSchema } from '../user/schema/user.schema';
import * as crypto from 'crypto';
import { Key } from '../key/schema/key.schema';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { UserAuthDto } from '../user/dto/userAuth.dto';
import { KeyService } from '../key/key.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)
        private userSchema: mongoose.Model<User>,
        @InjectModel(Key.name)
        private keySchema: mongoose.Model<Key>,
        private userService: UserService,
        private jwtService: JwtService,
        private keyService: KeyService
    ) { }

    async signupWithAuth(user: UserAuthDto): Promise<User> {

        // Check User Already Exists
        const userFindByEmail = await this.userService.getUserByEmail(user.email)
        if (userFindByEmail) {
            if (user.type === TypeUser.GOOGLE)
                throw new HttpException({ message: 'Google Account already exists in system' }, HttpStatus.CONFLICT)
            else if (user.type === TypeUser.GITHUB)
                throw new HttpException({ message: 'Google account of GitHub account already exists in system' }, HttpStatus.CONFLICT)
            else
                throw new HttpException({ message: 'User already exists' }, HttpStatus.CONFLICT)
        }

        const userEncode: User = {
            fullname: user.fullname,
            image: user.image,
            email: user.email,
            type: user.type
        }

        // Create User to MongoDB
        const userResult = await this.userSchema.create(userEncode)
        return userResult
    }

    async signup(user: UserDto): Promise<User> {

        // encode password
        const encodePassword = await bcrypt.hash(user.password, 10)

        // Check User Already Exists
        const userFindByEmail = await this.userService.getUserByEmail(user.email)
        if (userFindByEmail) {
            throw new HttpException({ message: 'User already exists' }, HttpStatus.CONFLICT)
        }
        const userFindByUsername = await this.userService.getUserByUserName(user.username)
        if (userFindByUsername) {
            throw new HttpException({ message: 'User already exists' }, HttpStatus.CONFLICT)
        }

        const userEncode: User = {
            username: user.username,
            password: encodePassword,
            fullname: user.fullname,
            image: user.image,
            email: user.email,
            type: user.type
        }

        // Create User to MongoDB
        const userResult = await this.userSchema.create(userEncode)
        return userResult
    }

    async signin(usernameOrEmail: string, password: string, res: Response): Promise<{ status: number, metadata: any }> {
        try {
            // Get By Username
            let user = await this.userService.getUserByUserName(usernameOrEmail)
            // Not Found User Case
            if (!user) {

                // Get By Email
                user = await this.userService.getUserByEmail(usernameOrEmail)
                if (!user) {
                    throw new HttpException({ message: "Not Found User" }, HttpStatus.NOT_FOUND)
                } else {
                    // Trường hợp người dụng nhập gmail của tk loại Google bằng email và password
                    if (user.type !== TypeUser.NORMAL && password !== '') {
                        throw new HttpException({ message: "Not Found User" }, HttpStatus.NOT_FOUND)
                    }
                }
            }

            console.log(user)

            // Compare Password
            if (user.type === TypeUser.NORMAL) {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    throw new HttpException({ message: "Password Don't Match" }, HttpStatus.FORBIDDEN)
                }
            }

            // Generate Keys
            const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", { modulusLength: 4096 })

            // Export the key values as strings
            // Use to Generate Token
            const publicKeyString = publicKey.export({ type: 'spki', format: 'pem' }).toString();
            // Use to validate Token
            const privateKeyString = privateKey.export({ type: 'pkcs8', format: 'pem' }).toString();

            // Generate AccessToken
            const accessToken = this.jwtService.sign({ user_id: user._id }, {
                privateKey: privateKeyString,
                expiresIn: "1h",
                algorithm: 'RS256'
            })

            // Generate RefreshToken
            const refreshToken = this.jwtService.sign({ user_id: user._id }, {
                privateKey: privateKeyString,
                expiresIn: "1y",
                algorithm: 'RS256'
            })

            // Create Key Object and insert to MongoDB
            const key: Key = {
                user_id: user._id,
                publicKey: publicKeyString,
                refreshToken: refreshToken,
                status: true
            }
            await this.keyService.deleteAllKeyByUser(user._id)
            await this.keySchema.create(key)

            // Save privateKey AccessToken RefreshToken to Cookie
            res.cookie('privateKey', privateKeyString, { httpOnly: false })
            res.cookie('accessToken', accessToken, { httpOnly: false })
            res.cookie('refreshToken', refreshToken, { httpOnly: false })
            res.cookie('user_id', user._id, { httpOnly: false })

            return {
                status: 200,
                metadata: {
                    data: user
                }
            }
        } catch (error) {
            console.error(error)
            throw new HttpException({ message: error }, HttpStatus.FAILED_DEPENDENCY)
        }
    }

    async checkToken(user_id: Types.ObjectId): Promise<User> {
        return await this.userSchema.findById(user_id)
    }
}
