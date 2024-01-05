import { Module } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyController } from './vocabulary.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { VocabularySchema } from './schema/vocabulary.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Vocabulary", schema: VocabularySchema }])],
  providers: [VocabularyService],
  controllers: [VocabularyController]
})
export class VocabularyModule { }
