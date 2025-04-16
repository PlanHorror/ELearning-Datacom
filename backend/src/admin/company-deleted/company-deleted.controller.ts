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
import { CompanyDeletedService } from './company-deleted.service';
import { CompanyDeletedEntityDto } from 'src/common/dtos/admin';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@Controller('admin/company-deleted')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
export class CompanyDeletedController {
  constructor(private companyDeletedService: CompanyDeletedService) {}

  @Get()
  async getDeletedCompanies(
    @Query('id') id?: string,
    @Query('old_id') old_id?: string,
    @Query('email') email?: string,
  ) {
    return await this.companyDeletedService.getDeletedCompaniesService(
      id,
      old_id,
      email,
    );
  }

  @Post()
  async createDeletedCompany(@Body() data: CompanyDeletedEntityDto) {
    return await this.companyDeletedService.createDeletedCompanyService(data);
  }

  @Patch('/:id')
  async updateDeletedCompany(
    @Param('id') id: string,
    @Body() data: CompanyDeletedEntityDto,
  ) {
    return await this.companyDeletedService.updateDeletedCompanyService(
      id,
      data,
    );
  }

  @Delete('/:id')
  async deleteDeletedCompany(@Param('id') id: string) {
    return await this.companyDeletedService.deleteDeletedCompanyService(id);
  }
}
