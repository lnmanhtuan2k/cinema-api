import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { genresData } from './data/genres.data';
import { ImportGenresDto } from './dto/import-genres.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class GenresService {
  constructor(private prisma: PrismaService) {}

  async create(createGenreDto: CreateGenreDto) {
    return this.prisma.genre.create({
      data: createGenreDto,
    });
  }

  async findAll() {
    return this.prisma.genre.findMany();
  }

  async findOne(id: string) {
    return this.prisma.genre.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateGenreDto: UpdateGenreDto) {
    return this.prisma.genre.update({
      where: { id },
      data: updateGenreDto,
    });
  }

  async remove(id: string) {
    return this.prisma.genre.delete({
      where: { id },
    });
  }
  
  async importAll(options: ImportGenresDto = {}) {
    const { updateExisting = false, override = false } = options;
    
    // Option to override all existing genres
    if (override) {
      await this.prisma.genre.deleteMany({});
      
      const result = await this.prisma.genre.createMany({
        data: genresData,
      });
      
      return {
        message: 'All genres deleted and reimported successfully',
        count: result.count,
      };
    }
    
    // Get existing genres
    const existingGenres = await this.prisma.genre.findMany();
    const existingGenresByName = new Map(
      existingGenres.map(genre => [genre.name, genre])
    );
    
    // Process updates and additions
    const toCreate: { name: string }[] = [];
    const updateOperations: Promise<any>[] = [];

    for (const genreData of genresData) {
      const existingGenre = existingGenresByName.get(genreData.name);
      
      if (!existingGenre) {
        // New genre to create
        toCreate.push(genreData);
      } else if (updateExisting) {
        // Existing genre to update
        updateOperations.push(
          this.prisma.genre.update({
            where: { id: existingGenre.id },
            data: genreData,
          })
        );
      }
    }
    
    // Perform database operations
    let createdCount = 0;
    let updatedCount = 0;
    
    if (toCreate.length > 0) {
      const createResult = await this.prisma.genre.createMany({
        data: toCreate,
        skipDuplicates: true,
      });
      createdCount = createResult.count;
    }
    
    if (updateExisting && updateOperations.length > 0) {
      await Promise.all(updateOperations);
      updatedCount = updateOperations.length;
    }
    
    // Generate appropriate response
    if (createdCount === 0 && updatedCount === 0) {
      return { message: 'All genres are already up-to-date', count: 0 };
    }
    
    return {
      message: 'Genres import completed successfully',
      created: createdCount,
      updated: updatedCount,
      total: createdCount + updatedCount,
    };
  }
}