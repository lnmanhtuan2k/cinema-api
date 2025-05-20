import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';
import { TheatersModule } from './theaters/theaters.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { BookingsModule } from './bookings/bookings.module';
import { RoomsModule } from './rooms/rooms.module';
import { ChairsModule } from './chairs/chairs.module';
import { AdminSeederService } from './admin-seeder/admin-seeder.service';
import { CountriesModule } from './countries/countries.module';
import { GenresModule } from './genres/genres.module';
import { MovieGenresModule } from './movie-genres/movie-genres.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UsersModule,
    MoviesModule,
    TheatersModule,
    ShowtimesModule,
    BookingsModule,
    RoomsModule,
    ChairsModule,
    CountriesModule,
    GenresModule,
    MovieGenresModule,
  ],
  providers: [PrismaService, AdminSeederService],
})
export class AppModule {}