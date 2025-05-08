import { Controller, Post, Body, Get, Query, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.usersService.createWithVerification(dto);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  // Google OAuth routes
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { user } = req;

    return res.json({
      status: 'success',
      message: 'Google authentication successful',
      data: {
        user: user.user,
        access_token: user.access_token
      }
    });
  }
}