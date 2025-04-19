import { Module } from '@nestjs/common';
import { CompanyAdminService } from './company-admin.service';
import { CompanyController } from './company-admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/auth/entity/company.entity';

@Module({
  providers: [CompanyAdminService],
  controllers: [CompanyController],
  imports: [AuthModule, TypeOrmModule.forFeature([Company])],
  exports: [CompanyAdminService],
})
export class CompanyAdminModule {}
