import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    required: false
  })
  email?: string;

  @ApiProperty({
    description: 'Username for login',
    example: 'johndoe',
    required: false
  })
  username?: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    format: 'password',
    required: false
  })
  password?: string;

  @ApiProperty({
    description: 'Full name of the user',
    example: 'John Doe',
    required: false
  })
  name?: string;
} 