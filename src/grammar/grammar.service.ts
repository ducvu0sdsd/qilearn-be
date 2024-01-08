import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Grammar } from './schema/grammar.schema';
import mongoose, { Types } from 'mongoose';
import { GrammarDto } from './dto/grammar.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GrammarService {

    constructor(
        @InjectModel(Grammar.name)
        private grammarSchema: mongoose.Model<Grammar>
    ) { }

    async createGrammar(grammar: GrammarDto): Promise<Grammar> {

        const results: string[] = (await this.getAllGrammarByUserID(grammar.user_id.toString())).map(item => item.structure.toLowerCase())
        if (results.includes(grammar.structure.toLowerCase())) {
            throw new HttpException({ message: 'This grammar already exists in system' }, HttpStatus.FORBIDDEN)
        } else {
            return await this.grammarSchema.create(grammar)
        }
    }

    async getAllGrammarByUserID(id: string): Promise<Grammar[]> {
        return await this.grammarSchema.find({ user_id: id })
    }

    async deleteGrammar(id: string): Promise<Grammar | any> {
        return await this.grammarSchema.findByIdAndDelete(new Types.ObjectId(id))
    }
}
