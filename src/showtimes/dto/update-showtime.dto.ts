import { PartialType } from '@nestjs/mapped-types';
import { CreateShowtimeDto } from './create-showtime.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateShowtimeDto extends PartialType(CreateShowtimeDto) {
  @ApiProperty({
    description: 'Showtime (date and time)',
    example: '2023-05-25T18:30:00Z',
    type: Date,
    required: false
  })
  time?: Date;

  @ApiProperty({
    description: 'Movie ID for this showtime',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false
  })
  movieId?: string;

  @ApiProperty({
    description: 'Room ID for this showtime',
    example: '550e8400-e29b-41d4-a716-446655440001',
    required: false
  })
  roomId?: string;
} 