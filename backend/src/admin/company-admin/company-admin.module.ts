import { Module } from '@nestjs/common';
import { CompanyAdminService } from './company-admin.service';
import { CompanyAdminController } from './company-admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/company/entity/company.entity';

@Module({
  providers: [CompanyAdminService],
  controllers: [CompanyAdminController],
  imports: [AuthModule, TypeOrmModule.forFeature([Company])],
  exports: [CompanyAdminService],
})
export class CompanyAdminModule {}
