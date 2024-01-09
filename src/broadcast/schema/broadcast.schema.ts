import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


export interface SubtitleInterface {
    id: number,
    firstTime: number,
    lastTime: number,
    content: string
}

@Schema({ timestamps: true })
export class BroadCast {
    @Prop()
    urlVideo: string

    @Prop({ default: [] })
    englishSubtitle: SubtitleInterface[]

    @Prop({ default: [] })
    vietnameseSubtitle: SubtitleInterface[]

    @Prop()
    title: string

    @Prop()
    channelTitle: string

    @Prop()
    thum: string

    @Prop()
    duration: string
}

export const BroadCastSchema = SchemaFactory.createForClass(BroadCast)