import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShowtimeDto {
  @ApiProperty({
    description: 'Showtime (date and time)',
    example: '2023-05-25T18:30:00Z',
    type: Date
  })
  @IsDateString()
  time: Date;

  @ApiProperty({
    description: 'Movie ID for this showtime',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  movieId: string;

  @ApiProperty({
    description: 'Room ID for this showtime',
    example: '550e8400-e29b-41d4-a716-446655440001'
  })
  @IsUUID()
  roomId: string;
}