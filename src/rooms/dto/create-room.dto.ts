import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  theaterId: string;
}
