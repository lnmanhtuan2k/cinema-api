import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieGenreDto {
  @ApiProperty({
    description: 'The ID of the movie',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsNotEmpty()
  @IsUUID()
  movieId: string;

  @ApiProperty({
    description: 'The ID of the genre',
    example: '123e4567-e89b-12d3-a456-426614174001'
  })
  @IsNotEmpty()
  @IsUUID()
  genreId: string;

  @ApiProperty({
    description: 'Whether this genre is the primary genre for the movie',
    example: false,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  isPrimary?: boolean;
} 