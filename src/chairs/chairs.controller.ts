import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { ChairsService } from './chairs.service';
import { CreateChairDto } from './dto/create-chair.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Chairs')
@ApiBearerAuth('JWT')
@Controller('/api/chairs')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ChairsController {
  constructor(private readonly chairsService: ChairsService) {}

  @ApiOperation({ summary: 'Get all chairs' })
  @ApiResponse({ status: 200, description: 'List of chairs has been returned successfully' })
  @Get()
  async findAll() {
    return this.chairsService.findAll();
  }

  @ApiOperation({ summary: 'Find chair by ID' })
  @ApiResponse({ status: 200, description: 'Chair has been found' })
  @ApiResponse({ status: 404, description: 'Chair not found' })
  @ApiParam({ name: 'id', description: 'ID of the chair' })
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.chairsService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new chair' })
  @ApiResponse({ status: 201, description: 'Chair has been created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @Roles('MANAGER', 'ADMIN')
  @Post()
  async create(@Body() body: CreateChairDto) {
    return this.chairsService.create(body);
  }

  @ApiOperation({ summary: 'Update chair' })
  @ApiResponse({ status: 200, description: 'Chair has been updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Chair not found' })
  @ApiParam({ name: 'id', description: 'ID of the chair' })
  @Roles('MANAGER', 'ADMIN')
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: Partial<CreateChairDto>) {
    return this.chairsService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete chair' })
  @ApiResponse({ status: 200, description: 'Chair has been deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Chair not found' })
  @ApiParam({ name: 'id', description: 'ID of the chair' })
  @Roles('MANAGER', 'ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.chairsService.delete(id);
  }
}
