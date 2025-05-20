import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  // Set up Swagger only in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Cinema Backend API')
      .setDescription('API for cinema management system')
      .setVersion('1.0.0')
      .addTag('Movies')
      .addTag('Theaters')
      .addTag('Bookings')
      .addTag('Users')
      .addTag('Showtimes')
      .addTag('Rooms')
      .addTag('Chairs')
      .addTag('Auth')
      .addTag('Countries')
      .addTag('Genres')
      .addTag('Movie Genres')
      .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'JWT'
      )
      .build();
    
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
  }
  
  await app.listen(process.env.PORT ?? 3000);
  
  console.log(`Application is running on: ${await app.getUrl()}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Swagger documentation available at: ${await app.getUrl()}/api/docs`);
  }
}
bootstrap();
