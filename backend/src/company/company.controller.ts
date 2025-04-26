import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { GetUser, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { Company } from './entity/company.entity';
import { CompanyUpdateDto } from 'src/common/dtos';

@Controller('company')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.COMPANY)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get('/profile')
  async getProfile(@GetUser() company: Company): Promise<Company> {
    return await this.companyService.getCompanyProfileService(company);
  }

  @Patch()
  async updateProfile(
    @GetUser() company: Company,
    @Body() companyUpdateDto: CompanyUpdateDto,
  ): Promise<Company> {
    return await this.companyService.updateCompanyService(
      company,
      companyUpdateDto,
    );
  }

  @Delete()
  async deleteProfile(@GetUser() company: Company): Promise<void> {
    return await this.companyService.deleteCompanyService(company);
  }
}
