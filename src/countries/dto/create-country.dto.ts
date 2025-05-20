import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({
    description: 'The name of the country',
    example: 'United States'
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The country code (usually 2 letter ISO code)',
    example: 'US'
  })
  @IsNotEmpty()
  @IsString()
  code: string;
} 