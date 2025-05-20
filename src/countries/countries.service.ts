import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { countriesData } from './data/countries.data';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async create(createCountryDto: CreateCountryDto) {
    return this.prisma.country.create({
      data: createCountryDto,
    });
  }

  async findAll() {
    return this.prisma.country.findMany();
  }

  async findOne(id: string) {
    return this.prisma.country.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    return this.prisma.country.update({
      where: { id },
      data: updateCountryDto,
    });
  }

  async remove(id: string) {
    return this.prisma.country.delete({
      where: { id },
    });
  }
  
  async importAll() {
    const existingCountries = await this.prisma.country.findMany({
      select: { code: true },
    });
    const existingCodes = new Set(existingCountries.map(c => c.code));
    
    const newCountries = countriesData.filter(c => !existingCodes.has(c.code));
    
    if (newCountries.length === 0) {
      return { message: 'All countries already imported', count: 0 };
    }
    
    await this.prisma.country.createMany({
      data: newCountries,
      skipDuplicates: true,
    });
    
    return { 
      message: 'Countries imported successfully', 
      count: newCountries.length 
    };
  }
} 