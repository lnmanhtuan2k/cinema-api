import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    description: 'ID of the showtime to book',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  showtimeId: string;
}
