import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @ApiProperty({
    description: 'Movie title',
    example: 'Avengers: Endgame',
    required: false
  })
  title?: string;

  @ApiProperty({
    description: 'Movie description',
    example: 'A movie about the Avengers superhero team',
    required: false
  })
  description?: string;

  @ApiProperty({
    description: 'Movie duration in minutes',
    example: 180,
    required: false
  })
  duration?: number;
  
  @ApiProperty({
    description: 'List of actors in the movie',
    example: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo'],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  actors?: string[];

  @ApiProperty({
    description: 'List of directors of the movie',
    example: ['Anthony Russo', 'Joe Russo'],
    required: false
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  directors?: string[];

  @ApiProperty({
    description: 'Age rating of the movie',
    example: 13,
    required: false
  })
  @IsInt()
  @IsOptional()
  ageRating?: number;

  @ApiProperty({
    description: 'URL to the movie poster image',
    example: 'https://example.com/images/avengers-endgame.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  poster?: string;

} 