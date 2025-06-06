import { Module } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { TheatersController } from './theaters.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TheatersController],
  providers: [TheatersService, PrismaService],
})
export class TheatersModule {}