import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDelete } from 'src/auth/entity/comany-delete.entity';
import { CompanyDeletedAdminController } from './company-deleted-admin.controller';
import { CompanyDeletedAdminService } from './company-deleted-admin.service';

@Module({
  controllers: [CompanyDeletedAdminController],
  providers: [CompanyDeletedAdminService],
  imports: [AuthModule, TypeOrmModule.forFeature([CompanyDelete])],
})
export class CompanyDeletedAdminModule {}
