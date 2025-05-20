import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateMovieDto) {
    return this.prisma.movie.create({ data });
  }

  async findAll() {
    return this.prisma.movie.findMany({
      include: {
        genres: {
          include: {
            genre: true
          }
        },
        country: true
      }
    });
  }

  async findById(id: string) {
    return this.prisma.movie.findUnique({
      where: { id },
      include: {
        genres: {
          include: {
            genre: true
          }
        },
        country: true
      }
    });
  }

  async update(id: string, data: UpdateMovieDto) {
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