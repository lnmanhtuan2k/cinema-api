import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
    required: false
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Username for login',
    example: 'johndoe',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'User password',
    example: 'password123',
    format: 'password'
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
