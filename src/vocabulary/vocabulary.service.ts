import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Vocabulary } from './schema/vocabulary.schema';
import { InjectModel } from '@nestjs/mongoose';
import { VocabularyDto } from './dto/vocabulary.dto';

@Injectable()
export class VocabularyService {

    constructor(
        @InjectModel(Vocabulary.name)
        private vocabularySchema = mongoose.Model<Vocabulary>
    ) { }

    async insertVocabulary(vocabulary: VocabularyDto): Promise<Vocabulary> {
        return await this.vocabularySchema.create(vocabulary)
    }
}
