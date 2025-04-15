import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { CompanyEntityDto } from 'src/common/dtos/admin';

@Controller('admin/company')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  async getCompany(@Query('id') id?: string, @Query('email') email?: string) {
    return await this.companyService.getCompaniesService(id, email);
  }

  @Post()
  async createCompany(@Query() data: CompanyEntityDto) {
    return await this.companyService.createService(data);
  }

  @Patch('/:id')
  async updateCompany(
    @Param('id') id: string,
    @Query() data: CompanyEntityDto,
  ) {
    return await this.companyService.updateService(data, id);
  }

  @Delete('/:id')
  async deleteCompany(@Param('id') id: string) {
    return await this.companyService.deleteService(id);
  }
}
