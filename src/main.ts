import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Add express-session middleware
  app.use(
    session({
      secret: process.env.JWT_SECRET || 'supersecretkey',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000 * 60, // 1 hour
      },
    }),
  );
  
  // Enable CORS
  app.enableCors();
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
