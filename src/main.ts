import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory,  } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['log', 'error', 'warn', 'debug']});
  // set up parser, session set up, cors, helmet, logger, static, view engine, etc. 
  //set parser
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.setGlobalPrefix('api');
  
  await app.listen(3000);
}
bootstrap();
