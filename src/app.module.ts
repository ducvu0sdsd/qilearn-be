import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { KeyModule } from './key/key.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    // UserModule,
    // AuthModule,
    // KeyModule,
    // MongooseModule.forRoot(process.env.DB_URI),
    // JwtModule.register({
    //   signOptions: { expiresIn: '1h' },
    // }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/users', method: RequestMethod.GET },
        { path: '/auth/check-token', method: RequestMethod.GET }
      )
  }
}
