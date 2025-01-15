import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mongoose, { Types } from 'mongoose';
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
        const results: string[] = (await this.getAllVocabulariesByUserID(vocabulary.user_id.toString())).map(item => item.english.toLowerCase())
        if (results.includes(vocabulary.english.toLowerCase())) {
            throw new HttpException({ message: 'This vocabulary already exists in system' }, HttpStatus.FORBIDDEN)
        } else {
            return await this.vocabularySchema.create(vocabulary)
        }
    }

    async getAllVocabulariesByUserID(id: string): Promise<Vocabulary[]> {
        return await this.vocabularySchema.find({ user_id: id })
    }

    async updateStateForget(voca : Vocabulary, id: string): Promise<Vocabulary> {
        return await this.vocabularySchema.findByIdAndUpdate(id, voca, {new : true})
    }

    async deleteVocabulary(id: string): Promise<Vocabulary | any> {
        return await this.vocabularySchema.findByIdAndDelete(new Types.ObjectId(id))
    }
}
