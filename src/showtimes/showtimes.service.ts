import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';

@Injectable()
export class ShowtimesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateShowtimeDto) {
    return this.prisma.showtime.create({ data });
  }

  async findAll() {
    return this.prisma.showtime.findMany({
      include: {
        movie: true,
        room: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.showtime.findUnique({
      where: { id },
      include: {
        movie: true,
        room: true,
      },
    });
  }

  async findByMovieId(movieId: string) {
    return this.prisma.showtime.findMany({
      where: { movieId },
      include: {
        movie: true,
        room: true,
      },
    });
  }

  async update(id: string, data: Partial<CreateShowtimeDto>) {
    return this.prisma.showtime.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.showtime.delete({ where: { id } });
  }
}
