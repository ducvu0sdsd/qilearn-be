import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { VocabularyModule } from './vocabulary/vocabulary.module';
import { GrammarModule } from './grammar/grammar.module';
import { BroadcastModule } from './broadcast/broadcast.module';
import { BroadcastController } from './broadcast/broadcast.controller';
import { GrammarController } from './grammar/grammar.controller';
import { UserController } from './user/user.controller';
import { VocabularyController } from './vocabulary/vocabulary.controller';
import { NoteModule } from './note/note.module';
import { FolderModule } from './folder/folder.module';
import { NoteController } from './note/note.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    UserModule,
    AuthModule,
    MongooseModule.forRoot(process.env.DB_URI),
    JwtModule,
    VocabularyModule,
    GrammarModule,
    BroadcastModule,
    NoteModule,
    FolderModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/users', method: RequestMethod.GET },
        { path: '/auth/check-token', method: RequestMethod.GET },
        BroadcastController,
        GrammarController,
        UserController,
        VocabularyController,
        NoteController,
        BroadcastController
      )
  }
}
