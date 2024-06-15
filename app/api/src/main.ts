import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './libs/errors/prisma-exception.filter';
import  admin  from "firebase-admin";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
  await app.listen(3000);
}
bootstrap();
