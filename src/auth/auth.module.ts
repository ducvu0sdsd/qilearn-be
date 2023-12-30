import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from '../user/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { KeySchema } from '../key/schema/key.schema';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { KeyModule } from '../key/key.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "Key", schema: KeySchema }]),
    UserModule,
    KeyModule,
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
