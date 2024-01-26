import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderDto } from './dto/folder.dto';
import { Folder } from './schema/folder.schema';

@Controller('folders')
export class FolderController {
    constructor(
        private folderService: FolderService
    ) { }

    @Post()
    async createFolder(@Body() folder: FolderDto): Promise<Folder> {
        return await this.folderService.createFolder(folder)
    }

    @Get(':id')
    async getAllFolder(@Param('id') id: string): Promise<Folder[]> {
        return await this.folderService.getAllFolderByUserID(id)
    }

    @Delete(':id')
    async deleteFolder(@Param('id') id: string): Promise<Folder> {
        return await this.folderService.deleteForder(id)
    }
}