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
import { Company } from 'src/company/entity/company.entity';
import { ApiQuery } from '@nestjs/swagger';

@Controller('admin/company')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
export class CompanyAdminController {
  constructor(private companyService: CompanyAdminService) {}

  @Get()
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'ID of the company',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Email of the company',
  })
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
