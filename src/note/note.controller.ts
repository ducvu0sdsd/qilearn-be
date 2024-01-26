import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NoteService } from './note.service';
import { NoteDto } from './dto/note.dto';
import { Note } from './schema/note.schema';

@Controller('notes')
export class NoteController {

    constructor(
        private noteService: NoteService
    ) { }

    @Post()
    async createNote(@Body() note: NoteDto): Promise<Note> {
        return await this.noteService.createNote(note)
    }

    @Get(':id')
    async getAllNoteByFolder(@Param('id') id: string): Promise<Note[]> {
        return await this.noteService.getAllNoteByUser(id)
    }

    @Delete(':id')
    async deleteNoteByFolder(@Param('id') id: string): Promise<Note> {
        return await this.noteService.deleteNote(id)
    }

    @Put()
    async updateNote(@Body() note: NoteDto): Promise<Note> {
        return await this.noteService.updateNote(note)
    }
}
