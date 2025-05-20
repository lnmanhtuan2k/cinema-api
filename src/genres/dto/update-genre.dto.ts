import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDto } from './create-genre.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGenreDto extends PartialType(CreateGenreDto) {
  @ApiProperty({
    description: 'The name of the genre',
    example: 'Action',
    required: false
  })
  name?: string;
} 