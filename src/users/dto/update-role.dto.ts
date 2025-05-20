import { IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoleDto {
  @ApiProperty({
    description: 'User role',
    enum: Role,
    example: 'ADMIN'
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
