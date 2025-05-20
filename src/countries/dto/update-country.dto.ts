import { PartialType } from '@nestjs/mapped-types';
import { CreateCountryDto } from './create-country.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto extends PartialType(CreateCountryDto) {
  @ApiProperty({
    description: 'The name of the country',
    example: 'United States',
    required: false
  })
  name?: string;

  @ApiProperty({
    description: 'The country code (usually 2 letter ISO code)',
    example: 'US',
    required: false
  })
  code?: string;
} 