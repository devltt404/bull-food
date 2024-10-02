import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import compression from 'compression';
import { AppModule } from './app.module';
import { AppConfig } from './config/app.config.type';
import handleValidationError from './utils/handle-validation-error';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfig | undefined = app.get(ConfigService).get('app');

  app.enableCors({
    origin: appConfig?.clientBaseUrl,
    credentials: true,
  });
  app.use(compression());
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: handleValidationError,
    }),
  );
  await app.listen(appConfig?.port || 4000, appConfig?.host || 'localhost');
}
bootstrap();
