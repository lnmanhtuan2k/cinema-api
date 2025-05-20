import { IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    description: 'Movie title',
    example: 'Avengers: Endgame'
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Movie description',
    example: 'A movie about the Avengers superhero team'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Movie duration in minutes',
    example: 180
  })
  @IsInt()
  duration: number; // duration in minutes

  @ApiProperty({
    description: 'ID of the country where the movie was produced',
    example: '9e219877-fd3e-4d77-b767-a5c041aabe0e',
    required: false
  })
  @IsUUID()
  @IsOptional()
  countryId?: string;

  @ApiProperty({
    description: 'List of actors in the movie',
    example: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo']
  })
  @IsArray()
  @IsString({ each: true })
  actors: string[];

  @ApiProperty({
    description: 'List of directors of the movie',
    example: ['Anthony Russo', 'Joe Russo']
  })
  @IsArray()
  @IsString({ each: true })
  directors: string[];

  @ApiProperty({
    description: 'Age rating of the movie',
    example: 13
  })
  @IsInt()
  ageRating: number;

  @ApiProperty({
    description: 'URL to the movie poster image',
    example: 'https://example.com/images/avengers-endgame.jpg',
    required: false
  })
  @IsString()
  @IsOptional()
  poster?: string;


}
