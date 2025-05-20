import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Rooms')
@ApiBearerAuth('JWT')
@Controller('/api/rooms')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({ summary: 'Get all rooms' })
  @ApiResponse({ status: 200, description: 'List of rooms has been returned successfully' })
  @Get()
  async findAll() {
    return this.roomsService.findAll();
  }

  @ApiOperation({ summary: 'Find room by ID' })
  @ApiResponse({ status: 200, description: 'Room has been found' })
  @ApiResponse({ status: 404, description: 'Room not found' })
  @ApiParam({ name: 'id', description: 'ID of the room' })
  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new room' })
  @ApiResponse({ status: 201, description: 'Room has been created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @Roles('MANAGER', 'ADMIN')
  @Post()
  async create(@Body() body: CreateRoomDto) {
    return this.roomsService.create(body);
  }

  @ApiOperation({ summary: 'Update room' })
  @ApiResponse({ status: 200, description: 'Room has been updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Room not found' })
  @ApiParam({ name: 'id', description: 'ID of the room' })
  @Roles('MANAGER', 'ADMIN')
  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() body: Partial<CreateRoomDto>) {
    return this.roomsService.update(id, body);
  }

  @ApiOperation({ summary: 'Delete room' })
  @ApiResponse({ status: 200, description: 'Room has been deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Room not found' })
  @ApiParam({ name: 'id', description: 'ID of the room' })
  @Roles('MANAGER', 'ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.roomsService.delete(id);
  }
}