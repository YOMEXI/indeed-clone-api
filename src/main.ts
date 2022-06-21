import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import * as morgan from 'morgan';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({
    credentials: true,
    exposedHeaders: ['Set-Cookie'],
    origin: process.env.CorsAllowedWebsite,
  });
  app.use(morgan('dev'));
  app.use(cookieParser());
  await app.listen(8000);
}
bootstrap();
