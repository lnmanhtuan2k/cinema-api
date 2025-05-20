import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe, Query } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('Showtimes')
@ApiBearerAuth('JWT')
@Controller('/api/showtimes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @ApiOperation({ summary: 'Get all showtimes' })
  @ApiResponse({ status: 200, description: 'List of showtimes has been returned successfully' })
  @ApiQuery({ name: 'movieId', required: false, description: 'ID of the movie to filter' })
  @Get()
  async findAll(@Query('movieId') movieId?: string) {
    if (movieId) {
      return this.showtimesService.findByMovieId(movieId);
    }
    return this.showtimesService.findAll();
  }

  @ApiOperation({ summary: 'Find showtime by ID' })
  @ApiResponse({ status: 200, description: 'Showtime has been found' })
  @ApiResponse({ status: 404, description: 'Showtime not found' })
  @ApiParam({ name: 'id', description: 'ID of the showtime' })
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.showtimesService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new showtime' })
  @ApiResponse({ status: 201, description: 'Showtime has been created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @Roles('MANAGER', 'ADMIN')
  @Post()
  async create(@Body() body: CreateShowtimeDto) {
    return this.showtimesService.create(body);
  }

  @ApiOperation({ summary: 'Update showtime' })
  @ApiResponse({ status: 200, description: 'Showtime has been updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Showtime not found' })
  @ApiParam({ name: 'id', description: 'ID of the showtime' })
  @Roles('MANAGER', 'ADMIN')
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: Partial<CreateShowtimeDto>) {
    return this.showtimesService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete showtime' })
  @ApiResponse({ status: 200, description: 'Showtime has been deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Showtime not found' })
  @ApiParam({ name: 'id', description: 'ID of the showtime' })
  @Roles('MANAGER', 'ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.showtimesService.delete(id);
  }
}
