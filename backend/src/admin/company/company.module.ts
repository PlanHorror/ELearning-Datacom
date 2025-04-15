import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from 'src/auth/entity/company.entity';

@Module({
  providers: [CompanyService],
  controllers: [CompanyController],
  imports: [AuthModule, TypeOrmModule.forFeature([Company])],
})
export class CompanyModule {}
