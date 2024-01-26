import { Module } from '@nestjs/common';
import { FolderController } from './folder.controller';
import { FolderService } from './folder.service';
import { FolderSchema } from './schema/folder.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteService } from 'src/note/note.service';
import { NoteModule } from 'src/note/note.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Folder", schema: FolderSchema }]),
    NoteModule
  ],
  controllers: [FolderController],
  providers: [FolderService]
})
export class FolderModule { }
