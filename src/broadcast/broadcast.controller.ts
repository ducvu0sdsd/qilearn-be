import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { BroadCast } from './schema/broadcast.schema';
import { BroadcastService } from './broadcast.service';

@Controller('broadcasts')
export class BroadcastController {

    constructor(
        private boardCastService: BroadcastService
    ) { }

    @Post()
    @UseInterceptors(FilesInterceptor('srtFiles'))
    async insert(@UploadedFiles() srtFiles: Express.Multer.File[], @Body() body: { urlVideo: string, title: string, channelName: string, thum: string, duration: string }): Promise<any> {
        const res = await this.boardCastService.insert(srtFiles[0], srtFiles[1], body.urlVideo, body.title, body.duration, body.channelName, body.thum)
        return res
    }

    @Get()
    async getAll(): Promise<BroadCast[]> {
        return await this.boardCastService.getAll()
    }
}
