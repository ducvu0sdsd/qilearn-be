
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NextFunction } from 'express';
import bodyParser from 'body-parser';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { cors: true });

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'https://qilearn-nu.vercel.app',
    // origin: 'http://127.0.0.1:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Accesstoken, Refreshtoken',
  });

  // Tăng kích thước file tải lên
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  await app.listen(8080);
}

bootstrap();

