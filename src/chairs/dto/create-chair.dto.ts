import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ChairType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChairDto {
  @ApiProperty({
    description: 'Chair code (e.g. A1, B2)',
    example: 'A1'
  })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: 'Type of chair',
    enum: ChairType,
    example: 'STANDARD'
  })
  @IsEnum(ChairType)
  type: ChairType;

  @ApiProperty({
    description: 'Room ID that this chair belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  @IsUUID()
  roomId: string;
}