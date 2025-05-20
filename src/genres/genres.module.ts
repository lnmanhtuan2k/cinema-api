import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GenresController],
  providers: [GenresService, PrismaService],
  exports: [GenresService],
})
export class GenresModule {} 