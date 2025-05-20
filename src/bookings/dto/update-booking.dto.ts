import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingDto } from './create-booking.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookingDto extends PartialType(CreateBookingDto) {
  @ApiProperty({
    description: 'ID of the showtime to book',
    example: '550e8400-e29b-41d4-a716-446655440000',
    required: false
  })
  showtimeId?: string;
} 