import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('/api/bookings')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @Roles('MANAGER', 'ADMIN')
  async findAll() {
    return this.bookingsService.findAll();
  }

  @Get('me')
  async findUserBookings(@Request() req) {
    return this.bookingsService.findUserBookings(req.user.userId);
  }

  @Post()
  async create(@Request() req, @Body() body: CreateBookingDto) {
    return this.bookingsService.create(req.user.userId, body.showtimeId);
  }

  @Roles('MANAGER', 'ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingsService.delete(id);
  }
}
