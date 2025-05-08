import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe, Query } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('/api/showtimes')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Get()
  async findAll(@Query('movieId') movieId?: string) {
    if (movieId) {
      return this.showtimesService.findByMovieId(movieId);
    }
    return this.showtimesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.showtimesService.findById(id);
  }

  @Roles('MANAGER', 'ADMIN')
  @Post()
  async create(@Body() body: CreateShowtimeDto) {
    return this.showtimesService.create(body);
  }

  @Roles('MANAGER', 'ADMIN')
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: Partial<CreateShowtimeDto>) {
    return this.showtimesService.update(id, body);
  }

  @Roles('MANAGER', 'ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.showtimesService.delete(id);
  }
}
