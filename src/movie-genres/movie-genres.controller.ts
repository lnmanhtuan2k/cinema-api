import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MovieGenresService } from './movie-genres.service';
import { CreateMovieGenreDto } from './dto/create-movie-genre.dto';
import { UpdateMovieGenreDto } from './dto/update-movie-genre.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@ApiTags('Movie Genres')
@Controller('movie-genres')
export class MovieGenresController {
  constructor(private readonly movieGenresService: MovieGenresService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a movie-genre relationship' })
  @ApiResponse({ status: 201, description: 'The relationship has been successfully created.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Movie or Genre not found.' })
  create(@Body() createMovieGenreDto: CreateMovieGenreDto) {
    return this.movieGenresService.create(createMovieGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all movie-genre relationships, optionally filtered by movieId or genreId' })
  @ApiQuery({ name: 'movieId', required: false, description: 'Filter by movie ID' })
  @ApiQuery({ name: 'genreId', required: false, description: 'Filter by genre ID' })
  @ApiResponse({ status: 200, description: 'Return movie-genre relationships.' })
  findAll(@Query('movieId') movieId?: string, @Query('genreId') genreId?: string) {
    if (movieId) {
      return this.movieGenresService.findByMovieId(movieId);
    }
    if (genreId) {
      return this.movieGenresService.findByGenreId(genreId);
    }
    return this.movieGenresService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a movie-genre relationship by id' })
  @ApiResponse({ status: 200, description: 'Return the relationship.' })
  @ApiResponse({ status: 404, description: 'Relationship not found.' })
  findOne(@Param('id') id: string) {
    return this.movieGenresService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update a movie-genre relationship' })
  @ApiResponse({ status: 200, description: 'The relationship has been successfully updated.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Relationship not found.' })
  update(@Param('id') id: string, @Body() updateMovieGenreDto: UpdateMovieGenreDto) {
    return this.movieGenresService.update(id, updateMovieGenreDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete a movie-genre relationship' })
  @ApiResponse({ status: 200, description: 'The relationship has been successfully deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Relationship not found.' })
  remove(@Param('id') id: string) {
    return this.movieGenresService.remove(id);
  }
} 