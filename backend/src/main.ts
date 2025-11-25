import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { KnexService } from './database/knex.service.js';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  // Запуск миграций перед стартом сервера
  const knexService = app.get(KnexService);
  console.log("Running migrations");
  await knexService.getKnex().migrate.latest();
  console.log("Migrations completed successfully");

  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(process.env.VITE_BACKEND_PORT ?? 8080, '0.0.0.0');
}
bootstrap();
