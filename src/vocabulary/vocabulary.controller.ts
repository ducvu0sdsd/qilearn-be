import { Body, Controller, Post } from '@nestjs/common';
import { VocabularyService } from './vocabulary.service';
import { VocabularyDto } from './dto/vocabulary.dto';
import { Vocabulary } from './schema/vocabulary.schema';

@Controller('vocabularies')
export class VocabularyController {

    constructor(
        private vocabularyService: VocabularyService
    ) { }

    @Post()
    async insertVocabulary(@Body() vocabulary: VocabularyDto): Promise<Vocabulary> {
        return await this.vocabularyService.insertVocabulary(vocabulary)
    }
}
