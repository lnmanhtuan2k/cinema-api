import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiProperty({
    description: 'Room name',
    example: 'Room A1',
    required: false
  })
  name?: string;

  @ApiProperty({
    description: 'Theater ID that this room belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false
  })
  theaterId?: string;
} 