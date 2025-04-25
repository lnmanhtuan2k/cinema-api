import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMovieDto) {
    return this.prisma.movie.create({ data });
  }

  async findAll() {
    return this.prisma.movie.findMany();
  }

  async findById(id: string) {
    return this.prisma.movie.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Partial<CreateMovieDto>) {
    return this.prisma.movie.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.movie.delete({
      where: { id },
    });
  }
}