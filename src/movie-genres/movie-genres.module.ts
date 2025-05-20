import { Module } from '@nestjs/common';
import { MovieGenresService } from './movie-genres.service';
import { MovieGenresController } from './movie-genres.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MovieGenresController],
  providers: [MovieGenresService, PrismaService],
  exports: [MovieGenresService],
})
export class MovieGenresModule {} 