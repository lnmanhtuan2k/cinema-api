import { Module } from '@nestjs/common';
import { ChairsService } from './chairs.service';
import { ChairsController } from './chairs.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ChairsController],
  providers: [ChairsService, PrismaService],
})
export class ChairsModule {}