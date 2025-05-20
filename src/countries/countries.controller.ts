import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Create a new country' })
  @ApiResponse({ status: 201, description: 'The country has been successfully created.', type: CreateCountryDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countriesService.create(createCountryDto);
  }

  @Post('import')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Import all countries' })
  @ApiResponse({ status: 201, description: 'Countries have been successfully imported.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  importAll() {
    return this.countriesService.importAll();
  }

  @Get()
  @ApiOperation({ summary: 'Get all countries' })
  @ApiResponse({ status: 200, description: 'Return all countries.', type: [CreateCountryDto] })
  findAll() {
    return this.countriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a country by id' })
  @ApiResponse({ status: 200, description: 'Return the country.', type: CreateCountryDto })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  findOne(@Param('id') id: string) {
    return this.countriesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Update a country' })
  @ApiResponse({ status: 200, description: 'The country has been successfully updated.', type: CreateCountryDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countriesService.update(id, updateCountryDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT')
  @ApiOperation({ summary: 'Delete a country' })
  @ApiResponse({ status: 200, description: 'The country has been successfully deleted.', type: CreateCountryDto })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Country not found.' })
  remove(@Param('id') id: string) {
    return this.countriesService.remove(id);
  }
} 