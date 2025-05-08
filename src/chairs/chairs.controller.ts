import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ChairsService } from './chairs.service';
import { CreateChairDto } from './dto/create-chair.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('/api/chairs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ChairsController {
  constructor(private readonly chairsService: ChairsService) {}

  @Get()
  async findAll() {
    return this.chairsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.chairsService.findById(id);
  }

  @Roles('MANAGER', 'ADMIN')
  @Post()
  async create(@Body() body: CreateChairDto) {
    return this.chairsService.create(body);
  }

  @Roles('MANAGER', 'ADMIN')
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: Partial<CreateChairDto>) {
    return this.chairsService.update(id, body);
  }

  @Roles('MANAGER', 'ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.chairsService.delete(id);
  }
}
