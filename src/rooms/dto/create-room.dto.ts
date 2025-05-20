import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Room name',
    example: 'Room A1'
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Theater ID that this room belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  theaterId: string;
}
