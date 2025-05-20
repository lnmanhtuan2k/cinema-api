import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { subject } from '@casl/ability';

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

  //Validate with Email
  private async validateByEmail(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      if (!user.isVerified && user.authProvider === 'LOCAL') {
        throw new UnauthorizedException('Please verify your email before logging in');
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  //Validate Login with username
  private async validateByUsername(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      if (!user.isVerified && user.authProvider === 'LOCAL') {
        throw new UnauthorizedException('Please verify your email before logging in');
      }
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  
  //Check User if user exists in dtb then excute the function below 
  async validateUser(dto: LoginDto) {
    const { email, username, password } = dto;
    let user;
    try {
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
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);
    const payload = { subject: user.id, role: user.role};
    return { 
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    };
  }
  
  // Validate or create user from Google OAuth
  async validateOrCreateGoogleUser(googleUser: {
    email: string;
    firstName: string;
    lastName: string;
    picture: string;
    accessToken: string;
  }) {
    let user = await this.usersService.findByEmail(googleUser.email);

    // Check user, create a new user if they don't exist
    if (!user) {
      user = await this.usersService.createGoogleUser({
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        picture: googleUser.picture,
      });
    }
    
    const payload = { subject: user.id, role: user.role };
    return { 
      user,
      access_token: this.jwtService.sign(payload)
    };
  }
}