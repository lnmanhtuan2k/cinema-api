import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateShowtimeDto {
  @IsDateString()
  time: Date;

  @IsUUID()
  movieId: string;

  @IsUUID()
  roomId: string;
}