import { Module } from '@nestjs/common';
import { KeyController } from './key.controller';
import { KeyService } from './key.service';
import { KeySchema } from './schema/key.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Key", schema: KeySchema }])],
  controllers: [KeyController],
  providers: [KeyService],
  exports: [KeyService]
})
export class KeyModule { }
