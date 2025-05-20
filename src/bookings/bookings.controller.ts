import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, ParseUUIDPipe } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Bookings')
@ApiBearerAuth('JWT')
@Controller('/api/bookings')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({ status: 200, description: 'List of bookings has been returned successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @Get()
  @Roles('MANAGER', 'ADMIN')
  async findAll() {
    return this.bookingsService.findAll();
  }

  @ApiOperation({ summary: 'Get bookings of the current user' })
  @ApiResponse({ status: 200, description: 'List of user bookings has been returned successfully' })
  @Get('me')
  async findUserBookings(@Request() req) {
    return this.bookingsService.findUserBookings(req.user.userId);
  }

  @ApiOperation({ summary: 'Create a new booking' })
  @ApiResponse({ status: 201, description: 'Booking has been created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post()
  async create(@Request() req, @Body() body: CreateBookingDto) {
    return this.bookingsService.create(req.user.userId, body.showtimeId);
  }

  @ApiOperation({ summary: 'Delete booking' })
  @ApiResponse({ status: 200, description: 'Booking has been deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  @Roles('MANAGER', 'ADMIN')
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookingsService.delete(id);
  }
}

