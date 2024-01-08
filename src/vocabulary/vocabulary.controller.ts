import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyDto } from './dto/vocabulary.dto';
import { Vocabulary } from './schema/vocabulary.schema';
import { Types } from 'mongoose';

@Controller('vocabularies')
export class VocabularyController {

    constructor(
        private vocabularyService: VocabularyService
    ) { }

    @Post()
    async insertVocabulary(@Body() vocabulary: VocabularyDto): Promise<Vocabulary> {
        return await this.vocabularyService.insertVocabulary(vocabulary)
    }

    @Get(':id')
    async getAllVocabulariesByUserID(@Param('id') id: string): Promise<Vocabulary[]> {
        return await this.vocabularyService.getAllVocabulariesByUserID(id)
    }

    @Delete(':id')
    async deleteVocabulary(@Param('id') id: string): Promise<Vocabulary> {
        console.log(id)
        return await this.vocabularyService.deleteVocabulary(id)
    }
}

