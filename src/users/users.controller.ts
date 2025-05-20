import { Controller, Get, Post, Body, Param, UseGuards, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ParseUUIDPipe } from '@nestjs/common';
import { UpdateUserRoleDto } from './dto/update-role.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth('JWT')
@Controller('/api/users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User has been created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.usersService.createWithVerification(dto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of users has been returned successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @Roles('ADMIN')
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Find user by ID' })
  @ApiResponse({ status: 200, description: 'User has been found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @Roles('ADMIN')
  @Get(':id')
  async findById(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Update user role' })
  @ApiResponse({ status: 200, description: 'User role has been updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  //Only admin can update grant role for someone
  @Roles('ADMIN')
  @Put(':id/role')
  async updateRole(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateRole(id, dto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User has been deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 403, description: 'Forbidden: Not authorized to perform this action' })
  @Roles('ADMIN')
  @Delete(':id')
  async delete(
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }
}