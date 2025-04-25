import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, showtimeId: string) {
    return this.prisma.booking.create({
      data: {
        user: { connect: { id: userId } },
        showtime: { connect: { id: showtimeId } },
      },
    });
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        user: true,
        showtime: {
          include: { movie: true, room: true },
        },
      },
    });
  }

  async findUserBookings(userId: string) {
    return this.prisma.booking.findMany({
      where: { userId },
      include: {
        showtime: {
          include: { movie: true, room: true },
        },
      },
    });
  }

  async delete(id: string) {
    return this.prisma.booking.delete({ where: { id } });
  }
}