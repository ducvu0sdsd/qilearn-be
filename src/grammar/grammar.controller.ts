import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { GrammarDto } from './dto/grammar.dto';
import { Grammar } from './schema/grammar.schema';

@Controller('grammars')
export class GrammarController {

    constructor(
        private grammarService: GrammarService
    ) { }

    @Post()
    async createGrammar(@Body() grammar: GrammarDto): Promise<Grammar> {
        return await this.grammarService.createGrammar(grammar)
    }

    @Get(':id')
    async getAllGrammarByUserID(@Param('id') id: string): Promise<Grammar[]> {
        return await this.grammarService.getAllGrammarByUserID(id)
    }

    @Delete(":id")
    async deleteGrammar(@Param('id') id: string): Promise<Grammar> {
        return await this.grammarService.deleteGrammar(id)
    }
}
