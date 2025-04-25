import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateChairDto } from './dto/create-chair.dto';

@Injectable()
export class ChairsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateChairDto) {
    return this.prisma.chair.create({ data });
  }

  async findAll() {
    return this.prisma.chair.findMany({
      include: {
        room: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.chair.findUnique({
      where: { id },
      include: {
        room: true,
      },
    });
  }

  async update(id: string, data: Partial<CreateChairDto>) {
    return this.prisma.chair.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.chair.delete({
      where: { id },
    });
  }
}