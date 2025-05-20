import { Controller, Post, Body, Get, Query, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiQuery } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ 
    status: 200, 
    description: 'Login successful',
    schema: {
      type: 'object',
      properties: {
        access_token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
        user: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '550e8400-e29b-41d4-a716-446655440000' },
            email: { type: 'string', example: 'user@example.com' },
            role: { type: 'string', example: 'USER' }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'Registration successful' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.usersService.createWithVerification(dto);
  }

  @ApiOperation({ summary: 'Verify email' })
  @ApiResponse({ status: 200, description: 'Email verified successfully' })
  @ApiResponse({ status: 400, description: 'Invalid or expired token' })
  @ApiQuery({ name: 'token', required: true, description: 'Email verification token' })
  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  // Google OAuth routes
  @ApiOperation({ summary: 'Login with Google' })
  @ApiResponse({ status: 302, description: 'Redirect to Google authentication' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    
  }

  @ApiOperation({ summary: 'Google authentication callback' })
  @ApiResponse({ status: 200, description: 'Google authentication successful' })
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