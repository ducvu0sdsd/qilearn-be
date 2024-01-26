import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Folder } from './schema/folder.schema';
import mongoose from 'mongoose';
import { FolderDto } from './dto/folder.dto';
import { NoteService } from 'src/note/note.service';

@Injectable()
export class FolderService {
    constructor(
        @InjectModel(Folder.name)
        private folderSchema: mongoose.Model<Folder>,
        private noteService: NoteService
    ) { }

    async createFolder(folder: FolderDto): Promise<Folder> {
        return await this.folderSchema.create(folder)
    }

    async getAllFolderByUserID(user_id: string): Promise<Folder[]> {
        return await this.folderSchema.find({ user_id: user_id })
    }

    async deleteForder(id: string): Promise<Folder> {
        await this.noteService.deleteAllNoteByFolder(id)
        return await this.folderSchema.findByIdAndDelete(id)
    }
}
