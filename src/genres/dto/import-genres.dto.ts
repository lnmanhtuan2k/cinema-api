import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class ImportGenresDto {
  @ApiProperty({
    description: 'Whether to update existing genres that match by name',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  updateExisting?: boolean;

  @ApiProperty({
    description: 'Whether to override all existing genres (CAUTION: this will delete all existing genres first)',
    example: false,
    required: false,
    default: false
  })
  @IsBoolean()
  @IsOptional()
  override?: boolean;
} 