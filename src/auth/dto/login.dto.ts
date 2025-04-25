import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
