import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/auth/entity/company.entity';
import { CompanyEntityDto } from 'src/common/dtos/admin';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CompanyAdminService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
  ) {}

  /*
   * Raw methods
   */

  // Get all companies from the database
  async getAllCompanies(): Promise<Company[]> {
    return await this.companyRepository.find();
  }

  // Get a company by id from the database
  async getCompanyById(id: string): Promise<Company> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.companyRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException('Company not found');
    }
  }

  // Get a company by email from the database
  async getCompanyByEmail(email: string): Promise<Company> {
    if (!email) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.companyRepository.findOneByOrFail({ email });
    } catch (error) {
      throw new NotFoundException('Company not found');
    }
  }

  // Create a new company in the database
  async createCompany(data: CompanyEntityDto) {
    try {
      const company = this.companyRepository.create(data);
      return await this.companyRepository.save(company);
    } catch (error) {
      if (error.code === '23505') {
        console.log(error);
        throw new BadRequestException('Company already exists');
      }
      throw new BadRequestException('Error creating company');
    }
  }

  // Update a company in the database
  async updateCompany(data: CompanyEntityDto, id: string) {
    try {
      return await this.companyRepository.save({
        id: id,
        ...data,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Company already exists');
      }
      throw new BadRequestException('Error updating company');
    }
  }

  // Delete a company from the database
  async deleteCompany(id: string): Promise<void> {
    try {
      await this.companyRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException('Company not found');
    }
  }

  /*
   * Service methods
   */

  // Get companies service
  async getCompaniesService(
    id?: string,
    email?: string,
  ): Promise<Company[] | Company> {
    if (id) {
      return await this.getCompanyById(id);
    } else if (email) {
      return await this.getCompanyByEmail(email);
    } else {
      return await this.getAllCompanies();
    }
  }

  // Create a new company service
  async createService(data: CompanyEntityDto): Promise<Company> {
    if (!data) {
      throw new BadRequestException('Not enough data provided');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    return await this.createCompany({
      ...data,
      password: hashedPassword,
    });
  }

  // Update a company service
  async updateService(data: CompanyEntityDto, id: string): Promise<Company> {
    if (!data || !id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getCompanyById(id);
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    return await this.updateCompany(
      {
        ...data,
        password: hashedPassword,
      },
      id,
    );
  }

  // Delete a company service
  async deleteService(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getCompanyById(id);
    return await this.deleteCompany(id);
  }
}
