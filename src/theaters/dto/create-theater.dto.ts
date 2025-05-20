import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTheaterDto {
  @ApiProperty({
    description: 'Theater name',
    example: 'Cinema Star'
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}