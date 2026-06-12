import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so the Next.js frontend can call this backend
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  // Run backend on port 3333 to avoid conflict with Next.js dev server (3000)
  await app.listen(3333);
  console.log('NestJS API running on http://localhost:3333');
}
bootstrap();
