import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entity/company.entity';
import { Repository } from 'typeorm';
import { CompanyRawDto, CompanyUpdateDto } from 'src/common/dtos';
import * as bcrypt from 'bcrypt';
import { CompanyDelete } from './entity/comany-delete.entity';
import { Status } from 'src/common/enums';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(CompanyDelete)
    private companyDeleteRepository: Repository<CompanyDelete>,
  ) {}
  /*
   * Raw methods
   */
  // Get all companies
  async getAllCompanies(): Promise<Company[]> {
    return await this.companyRepository.find({
      relations: ['coupons'],
    });
  }

  // Get company by id
  async getCompanyById(id: string): Promise<Company> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const company = await this.companyRepository.findOne({
        where: { id: id },
        relations: ['coupons'],
      });
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      return company;
    } catch (error) {
      throw new NotFoundException('Company not found');
    }
  }

  // Get company by email
  async getCompanyByEmail(email: string): Promise<Company> {
    if (!email) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.companyRepository.findOneByOrFail({
        email: email,
      });
    } catch (error) {
      throw new NotFoundException('Company not found');
    }
  }

  // Create company
  async createCompany(company: CompanyRawDto): Promise<Company> {
    try {
      return await this.companyRepository.save(company);
    } catch (error) {
      throw new BadRequestException('Error creating company');
    }
  }

  // Update company
  async updateCompany(id: string, company: Company): Promise<Company> {
    try {
      return await this.companyRepository.save({
        ...company,
        id: id,
      });
    } catch (error) {
      throw new BadRequestException('Error updating company');
    }
  }

  // Delete company
  async deleteCompany(id: string): Promise<void> {
    try {
      await this.companyRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Error deleting company');
    }
  }

  // Create deleted company
  async createDeletedCompany(company: Company): Promise<CompanyDelete> {
    try {
      return await this.companyDeleteRepository.save({
        old_id: company.id,
        email: company.email,
        address: company.address,
        company_name: company.company_name,
        created_at: company.created_at,
        last_updated: company.last_updated,
        last_login: company.last_login,
      });
    } catch (error) {
      throw new BadRequestException('Error creating deleted company');
    }
  }

  // Set company login time
  async setCompanyLoginTime(id: string): Promise<void> {
    try {
      await this.companyRepository.update(id, { last_login: new Date() });
    } catch (error) {
      throw new BadRequestException('Error setting company login time');
    }
  }

  // Update company status
  async updateCompanyStatus(id: string, status: Status): Promise<void> {
    try {
      const company = await this.getCompanyById(id);
      company.status = status;
      await this.companyRepository.save(company);
    } catch (error) {
      throw new BadRequestException('Error updating company status');
    }
  }

  // Check email existence
  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const company = await this.companyRepository.findOneByOrFail({
        email: email,
      });
      return !!company;
    } catch (error) {
      return false;
    }
  }

  /*
   * Service methods
   */
  // Get comapany profile
  async getCompanyProfileService(company: Company): Promise<Company> {
    if (!company) {
      throw new BadRequestException('Not enough data provided');
    }
    return await this.getCompanyById(company.id);
  }

  // Update company profile
  async updateCompanyService(
    company: Company,
    data: CompanyUpdateDto,
  ): Promise<Company> {
    if (!company || !data) {
      throw new BadRequestException('Not enough data provided');
    }
    const companyToUpdate = await this.getCompanyById(company.id);
    if (data.old_password && data.new_password && data.confirm_password) {
      const isMatch = await bcrypt.compare(
        data.old_password,
        companyToUpdate.password,
      );
      if (!isMatch) {
        throw new BadRequestException('Old password is incorrect');
      }
      if (data.new_password !== data.confirm_password) {
        throw new BadRequestException(
          'New password and confirm password do not match',
        );
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(data.new_password, salt);
      const updatedCompany = {
        ...companyToUpdate,
        address: data.address,
        company_name: data.company_name,
        password: hashedPassword,
      };
      return await this.updateCompany(company.id, updatedCompany);
    }
    const updatedCompany = {
      ...companyToUpdate,
      address: data.address,
      company_name: data.company_name,
    };
    return await this.updateCompany(company.id, updatedCompany);
  }

  // Delete company profile
  async deleteCompanyService(company: Company): Promise<void> {
    if (!company) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.createDeletedCompany(company);
    await this.deleteCompany(company.id);
  }
}
