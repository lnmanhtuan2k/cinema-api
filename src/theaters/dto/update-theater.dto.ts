import { PartialType } from '@nestjs/mapped-types';
import { CreateTheaterDto } from './create-theater.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTheaterDto extends PartialType(CreateTheaterDto) {
  @ApiProperty({
    description: 'Theater name',
    example: 'Cinema Star',
    required: false
  })
  name?: string;
} 