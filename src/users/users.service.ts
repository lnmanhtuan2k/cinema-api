import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-role.dto';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) { }

  async createWithVerification(data: CreateUserDto) {
    const existingEmail = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existingEmail) {
      throw new ConflictException('Email is already in use');
    }
    const existingUsername = await this.prisma.user.findUnique({ where: { username: data.username } });
    if (existingUsername) {
      throw new ConflictException('Username is already taken');
    }

    const hashed = await bcrypt.hash(data.password, 10);
    const token = uuidv4();
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashed,
        name: data.name,
        verificationToken: token,
        verificationTokenExpiresAt: expiresAt,
      },
    });
    await this.emailService.sendVerificationEmail(user.email, token);
    return { id: user.id, email: user.email };
  }

  async findByVerificationToken(token: string) {
    return this.prisma.user.findUnique({ where: { verificationToken: token } });
  }

  async verifyUser(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiresAt: null,
      },
    });
  }

  async create(data: CreateUserDto) {
    const hashed = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        password: hashed,
        name: data.name,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async updateRole(id: string, dto: UpdateUserRoleDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return this.prisma.user.update({
      where: { id },
      data: { role: dto.role },
    });
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return this.prisma.user.delete({ where: { id } });
  }
}