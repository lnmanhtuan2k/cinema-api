import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRoomDto) {
    return this.prisma.room.create({ data });
  }

  async findAll() {
    return this.prisma.room.findMany({
      include: {
        theater: true,
        showtimes: true,
        chairs: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.room.findUnique({
      where: { id },
      include: {
        theater: true,
        showtimes: true,
        chairs: true,
      },
    });
  }

  async update(id: string, data: Partial<CreateRoomDto>) {
    return this.prisma.room.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.room.delete({
      where: { id },
    });
  }
}