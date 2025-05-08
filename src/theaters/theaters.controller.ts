import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('/api/theaters')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Get()
  async findAll() {
    return this.theatersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.theatersService.findById(id);
  }

  @Roles('MANAGER', 'ADMIN')
  @Post()
  async create(@Body() body: CreateTheaterDto) {
    return this.theatersService.create(body);
  }

  @Roles('MANAGER', 'ADMIN')
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: Partial<CreateTheaterDto>) {
    return this.theatersService.update(id, body);
  }

  @Roles('MANAGER', 'ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.theatersService.delete(id);
  }
}
