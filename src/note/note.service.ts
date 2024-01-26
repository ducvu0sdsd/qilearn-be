import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { Note } from './schema/note.schema';
import { InjectModel } from '@nestjs/mongoose';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NoteService {
    constructor(
        @InjectModel(Note.name)
        private noteSchema: mongoose.Model<Note>
    ) { }

    async createNote(note: NoteDto): Promise<Note> {
        return await this.noteSchema.create(note)
    }

    async getAllNoteByUser(id: string): Promise<Note[]> {
        return await this.noteSchema.find({ user_id: id })
    }

    async deleteNote(id: string): Promise<Note> {
        return await this.noteSchema.findByIdAndDelete(id)
    }

    async deleteAllNoteByFolder(id: string) {
        await this.noteSchema.deleteMany({ folder: id })
    }

    async updateNote(note: NoteDto): Promise<Note> {
        return await this.noteSchema.findByIdAndUpdate(note._id, note, {
            new: true,
            runValidators: true,
        })
    }
}

