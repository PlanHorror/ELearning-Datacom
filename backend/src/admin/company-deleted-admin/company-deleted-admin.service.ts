import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDelete } from 'src/company/entity/comany-delete.entity';
import { CompanyDeletedEntityDto } from 'src/common/dtos/admin';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyDeletedAdminService {
  constructor(
    @InjectRepository(CompanyDelete)
    private companyDeletedRepository: Repository<CompanyDelete>,
  ) {}

  /*
   * Raw methods
   */

  // Get all deleted companies
  async getDeletedCompanies(): Promise<CompanyDelete[]> {
    return await this.companyDeletedRepository.find();
  }

  // Get deleted company by id
  async getDeletedCompanyById(id: string): Promise<CompanyDelete> {
    if (!id) throw new BadRequestException('Not enough data provided');
    try {
      const company = await this.companyDeletedRepository.findOneBy({ id });
      if (!company) throw new NotFoundException('Company not found');
      return company;
    } catch (error) {
      throw new NotFoundException('Company not found');
    }
  }

  // Get deleted company by old_id
  async getDeletedCompanyByOldId(old_id: string): Promise<CompanyDelete[]> {
    if (!old_id) throw new BadRequestException('Not enough data provided');
    try {
      const company = await this.companyDeletedRepository.find({
        where: { old_id },
      });
      return company;
    } catch (error) {
      throw new NotFoundException('Company not found');
    }
  }

  // Get deleted company by email
  async getDeletedCompanyByEmail(email: string): Promise<CompanyDelete[]> {
    if (!email) throw new BadRequestException('Not enough data provided');
    const company = await this.companyDeletedRepository.find({
      where: { email },
    });
    return company;
  }

  // Create deleted company
  async createDeletedCompany(
    data: CompanyDeletedEntityDto,
  ): Promise<CompanyDelete> {
    try {
      const company = this.companyDeletedRepository.create(data);
      return await this.companyDeletedRepository.save(company);
    } catch (error) {
      throw new BadRequestException('Error creating company', error.message);
    }
  }

  // Update deleted company
  async updateDeletedCompany(
    id: string,
    data: CompanyDeletedEntityDto,
  ): Promise<CompanyDelete> {
    try {
      return await this.companyDeletedRepository.save({
        id,
        ...data,
      });
    } catch (error) {
      throw new BadRequestException('Error updating company', error.message);
    }
  }

  // Delete deleted company
  async deleteDeletedCompany(id: string): Promise<void> {
    try {
      await this.companyDeletedRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Error deleting company', error.message);
    }
  }

  /*
   * Service methods
   */

  // Get deleted companies
  async getDeletedCompaniesService(
    id?: string,
    old_id?: string,
    email?: string,
  ): Promise<CompanyDelete[] | CompanyDelete> {
    if (id) return [await this.getDeletedCompanyById(id)];
    if (old_id) return await this.getDeletedCompanyByOldId(old_id);
    if (email) return await this.getDeletedCompanyByEmail(email);
    return await this.getDeletedCompanies();
  }

  // Create deleted company
  async createDeletedCompanyService(
    data: CompanyDeletedEntityDto,
  ): Promise<CompanyDelete> {
    if (!data) throw new BadRequestException('Data is required');
    return await this.createDeletedCompany(data);
  }

  // Update deleted company
  async updateDeletedCompanyService(
    id: string,
    data: CompanyDeletedEntityDto,
  ): Promise<CompanyDelete> {
    if (!id || !data) throw new BadRequestException('Not enough data provided');
    await this.getDeletedCompanyById(id); // Check if company exists
    return await this.updateDeletedCompany(id, data);
  }

  // Delete deleted company
  async deleteDeletedCompanyService(id: string): Promise<void> {
    if (!id) throw new BadRequestException('Not enough data provided');
    await this.getDeletedCompanyById(id); // Check if company exists
    return await this.deleteDeletedCompany(id);
  }
}
