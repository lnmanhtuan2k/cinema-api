import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTheaterDto } from './dto/create-theater.dto';

@Injectable()
export class TheatersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTheaterDto) {
    return this.prisma.theater.create({ data });
  }

  async findAll() {
    return this.prisma.theater.findMany({
      include: {
        rooms: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.theater.findUnique({
      where: { id },
      include: {
        rooms: true,
      },
    });
  }

  async update(id: string, data: Partial<CreateTheaterDto>) {
    return this.prisma.theater.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.theater.delete({
      where: { id },
    });
  }
}