import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BroadCast, SubtitleInterface } from './schema/broadcast.schema';
import mongoose from 'mongoose';
import { handleSRTFile } from '../utils';
import { BroadCastDto } from './dto/broadcast.dto';

@Injectable()
export class BroadcastService {

    constructor(
        @InjectModel(BroadCast.name)
        private broadcastSchema: mongoose.Model<BroadCast>
    ) { }

    async getAll(): Promise<BroadCast[]> {
        return await this.broadcastSchema.find()
    }

    async insert(englishSrtFile: Express.Multer.File, vietnameseSrtFile: Express.Multer.File, urlVideo: string, title: string, duration: string, channelName: string, thum: string): Promise<any> {
        try {
            if (!vietnameseSrtFile || !englishSrtFile) {
                throw new HttpException({ message: 'No file provided' }, HttpStatus.FORBIDDEN)
            }
            const broadcastsURL = (await this.getAll()).map(item => item.urlVideo)
            if (broadcastsURL.includes(urlVideo)) {
                throw new HttpException({ message: 'Broadcast already exists in the system' }, HttpStatus.FORBIDDEN)
            }
            const srtContentVI = vietnameseSrtFile.buffer.toString('utf-8');
            const srtContentEN = englishSrtFile.buffer.toString('utf-8');
            const vietnameseSubtitle: SubtitleInterface[] = handleSRTFile(srtContentVI)
            const englishSubtitle: SubtitleInterface[] = handleSRTFile(srtContentEN)
            const broadcast: BroadCastDto = { vietnameseSubtitle, englishSubtitle, urlVideo, title, channelName, thum, duration }
            const res = await this.broadcastSchema.create(broadcast)
            return res
        } catch (error) {
            console.log(error)
            throw new HttpException({ message: error }, HttpStatus.FORBIDDEN)
        }
    }
}
