import { Module } from '@nestjs/common';
import { GrammarController } from './grammar.controller';
import { GrammarService } from './grammar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GrammarSchema } from './schema/grammar.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Grammar", schema: GrammarSchema }])],
  controllers: [GrammarController],
  providers: [GrammarService]
})
export class GrammarModule { }
