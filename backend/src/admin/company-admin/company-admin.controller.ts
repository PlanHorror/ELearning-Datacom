import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyAdminService } from './company-admin.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { CompanyEntityDto } from 'src/common/dtos/admin';
import { Company } from 'src/auth/entity/company.entity';

@Controller('admin/company')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
export class CompanyController {
  constructor(private companyService: CompanyAdminService) {}

  @Get()
  async getCompany(
    @Query('id') id?: string,
    @Query('email') email?: string,
  ): Promise<Company[] | Company> {
    return await this.companyService.getCompaniesService(id, email);
  }

  @Post()
  async createCompany(@Body() data: CompanyEntityDto): Promise<Company> {
    return await this.companyService.createService(data);
  }

  @Patch('/:id')
  async updateCompany(
    @Param('id') id: string,
    @Body() data: CompanyEntityDto,
  ): Promise<Company> {
    return await this.companyService.updateService(data, id);
  }

  @Delete('/:id')
  async deleteCompany(@Param('id') id: string): Promise<void> {
    return await this.companyService.deleteService(id);
  }
}
