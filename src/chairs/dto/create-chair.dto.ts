import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ChairType } from '@prisma/client';

export class CreateChairDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(ChairType)
  type: ChairType;

  @IsUUID()
  roomId: string;
}