import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  console.log(process.env.DATABASE_URI);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT ?? 3001;

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Elearning API documentation')
    .setDescription('All API endpoints and their descriptions')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, documentFactory);

  // Serve static files
  const uploadPath = process.env.COUPON_IMAGE_URL || '/uploads/coupons/';
  app.useStaticAssets(path.join(process.cwd(), uploadPath), {
    prefix: '/uploads/coupons/',
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
