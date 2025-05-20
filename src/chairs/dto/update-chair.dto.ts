import { PartialType } from '@nestjs/mapped-types';
import { CreateChairDto } from './create-chair.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ChairType } from '@prisma/client';

export class UpdateChairDto extends PartialType(CreateChairDto) {
  @ApiProperty({
    description: 'Chair code (e.g. A1, B2)',
    example: 'A1',
    required: false
  })
  code?: string;

  @ApiProperty({
    description: 'Type of chair',
    enum: ChairType,
    example: 'STANDARD',
    required: false
  })
  type?: ChairType;

  @ApiProperty({
    description: 'Room ID that this chair belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false
  })
  roomId?: string;
} 