import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';

@Injectable()
export class MovieGenresService {
  constructor(private prisma: PrismaService) {}

  async create(createMovieGenreDto: CreateMovieGenreDto) {
    const { movieId, genreId, isPrimary } = createMovieGenreDto;
    
    // Check if movie and genre exist
    const movie = await this.prisma.movie.findUnique({ where: { id: movieId } });
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${movieId} not found`);
    }
    
    const genre = await this.prisma.genre.findUnique({ where: { id: genreId } });
    if (!genre) {
      throw new NotFoundException(`Genre with ID ${genreId} not found`);
    }
    
    return this.prisma.movieGenre.create({
      data: {
        movie: { connect: { id: movieId } },
        genre: { connect: { id: genreId } },
        isPrimary: isPrimary || false,
      },
      include: {
        movie: true,
        genre: true,
      },
    });
  }

  async findAll() {
    return this.prisma.movieGenre.findMany({
      include: {
        movie: true,
        genre: true,
      },
    });
  }

  async findByMovieId(movieId: string) {
    return this.prisma.movieGenre.findMany({
      where: { movieId },
      include: {
        genre: true,
      },
    });
  }

  async findByGenreId(genreId: string) {
    return this.prisma.movieGenre.findMany({
      where: { genreId },
      include: {
        movie: true,
      },
    });
  }

  async findOne(id: string) {
    const movieGenre = await this.prisma.movieGenre.findUnique({
      where: { id },
      include: {
        movie: true,
        genre: true,
      },
    });
    
    if (!movieGenre) {
      throw new NotFoundException(`MovieGenre with ID ${id} not found`);
    }
    
    return movieGenre;
  }

  async update(id: string, updateMovieGenreDto: UpdateMovieGenreDto) {
    const movieGenre = await this.prisma.movieGenre.findUnique({
      where: { id },
    });
    
    if (!movieGenre) {
      throw new NotFoundException(`MovieGenre with ID ${id} not found`);
    }
    
    return this.prisma.movieGenre.update({
      where: { id },
      data: updateMovieGenreDto,
      include: {
        movie: true,
        genre: true,
      },
    });
  }

  async remove(id: string) {
    const movieGenre = await this.prisma.movieGenre.findUnique({
      where: { id },
    });
    
    if (!movieGenre) {
      throw new NotFoundException(`MovieGenre with ID ${id} not found`);
    }
    
    return this.prisma.movieGenre.delete({
      where: { id },
    });
  }
} 