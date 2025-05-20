import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieGenreDto } from './create-movie-genre.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMovieGenreDto extends PartialType(CreateMovieGenreDto) {
  @ApiProperty({
    description: 'The ID of the movie',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false
  })
  movieId?: string;

  @ApiProperty({
    description: 'The ID of the genre',
    example: '123e4567-e89b-12d3-a456-426614174001',
    required: false
  })
  genreId?: string;

  @ApiProperty({
    description: 'Whether this genre is the primary genre for the movie',
    example: false,
    required: false
  })
  isPrimary?: boolean;
} 