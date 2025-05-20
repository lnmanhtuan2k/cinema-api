import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Theaters')
@ApiBearerAuth('JWT')
@Controller('/api/theaters')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @ApiOperation({ summary: 'Get all theaters' })
  @ApiResponse({ status: 200, description: 'List of theaters has been returned successfully' })
  @Get()
  async findAll() {
    return this.theatersService.findAll();
  }

  @ApiOperation({ summary: 'Find theater by ID' })
  @ApiResponse({ status: 200, description: 'Theater has been found' })
  @ApiResponse({ status: 404, description: 'Theater not found' })
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.theatersService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new theater' })
  @ApiResponse({ status: 201, description: 'Theater has been created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @Roles('MANAGER', 'ADMIN')
  @Post()
  async create(@Body() body: CreateTheaterDto) {
    return this.theatersService.create(body);
  }

  @ApiOperation({ summary: 'Update theater' })
  @ApiResponse({ status: 200, description: 'Theater has been updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Theater not found' })
  @Roles('MANAGER', 'ADMIN')
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: Partial<CreateTheaterDto>) {
    return this.theatersService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete theater' })
  @ApiResponse({ status: 200, description: 'Theater has been deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Theater not found' })
  @Roles('MANAGER', 'ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.theatersService.delete(id);
  }
}
