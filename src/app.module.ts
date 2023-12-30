import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { KeyModule } from './key/key.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    MongooseModule.forRoot('mongodb+srv://qilearn:ducvu0969@cluster0.gop3gcy.mongodb.net/Qilearn?retryWrites=true&w=majority'),
    // UserModule,
    // AuthModule,
    // KeyModule,
    JwtModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //   consumer
    //     .apply(AuthMiddleware)
    //     .forRoutes(
    //       { path: '/users', method: RequestMethod.GET },
    //       { path: '/auth/check-token', method: RequestMethod.GET }
    //     )
  }
}
