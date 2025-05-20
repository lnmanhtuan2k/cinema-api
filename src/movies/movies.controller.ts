import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('/api/movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Get All Movies' })
  @ApiResponse({ status: 200, description: 'All movies have been returned successfully' })
  @Get()
  async findAll() {
    return this.moviesService.findAll();
  }

  @ApiOperation({ summary: 'Find Movie by ID' })
  @ApiResponse({ status: 200, description: 'Movie has been found successfully' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.findById(id);
  }

  @ApiOperation({ summary: 'Create New Movie' })
  @ApiResponse({ status: 201, description: 'Movie has been created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('MANAGER', 'ADMIN')
  @Post()
  async create(@Body() body: CreateMovieDto) {
    return this.moviesService.create(body);
  }

  @ApiOperation({ summary: 'Update Movie' })
  @ApiResponse({ status: 200, description: 'Movie has been updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('MANAGER', 'ADMIN')
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: UpdateMovieDto) {
    return this.moviesService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete Movie' })
  @ApiResponse({ status: 200, description: 'Movie has been deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('MANAGER', 'ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.moviesService.delete(id);
  }
}
