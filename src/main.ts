import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import fastifyFileUpload from 'fastify-file-upload';
import { AppModule } from './app.module';
import { AppConfig } from './configs/app.config';

const bootstrap = async(): Promise<void> => {
  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );
  app.register(fastifyFileUpload);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))

  const config = app.get(AppConfig);
  const logger = new Logger('Bootstrap');

  if (!config.isProduction) {
    const documentConfig = new DocumentBuilder()
      .setTitle('Backend api')
      .setDescription('User service for bank app')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'JWT'
      )
      .build();

    SwaggerModule.setup(
      'swagger',
      app,
      SwaggerModule.createDocument(app, documentConfig),
    );
  }
  await app.listen(config.port, '0.0.0.0', (_, address) => {
    logger.debug(`Service available on ${address}`);
  });
};

bootstrap();
