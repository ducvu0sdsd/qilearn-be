import { Module } from '@nestjs/common';
import { BroadcastController } from './broadcast.controller';
import { BroadcastService } from './broadcast.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BroadCastSchema } from './schema/broadcast.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: "BroadCast", schema: BroadCastSchema }])],
  controllers: [BroadcastController],
  providers: [BroadcastService]
})
export class BroadcastModule { }
