import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //User register
  async register(dto: RegisterDto) {
    return this.usersService.createWithVerification(dto);
  }

  //Verify Email when user register
  async verifyEmail(token: string) {
    const user = await this.usersService.findByVerificationToken(token);
    if (
      !user ||!user.verificationTokenExpiresAt ||
      user.verificationTokenExpiresAt < new Date()
    ) {
      throw new BadRequestException('Verification link invalid or expired');
    }
    await this.usersService.verifyUser(user.id);
    return { message: 'Email verified successfully' };
  }

  //Login with Email
  private async validateByEmail(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //Login with username
  private async validateByUsername(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUser(dto: LoginDto) {
    const { email, username, password } = dto;
    let user;
    if (email) {
      user = await this.validateByEmail(email, password);
    }
    if (!user && username) {
      user = await this.validateByUsername(username, password);
    }
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = { sub: user.id, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
  
}
