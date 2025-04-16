import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyDelete } from 'src/auth/entity/comany-delete.entity';
import { CompanyDeletedController } from './company-deleted.controller';
import { CompanyDeletedService } from './company-deleted.service';

@Module({
  controllers: [CompanyDeletedController],
  providers: [CompanyDeletedService],
  imports: [AuthModule, TypeOrmModule.forFeature([CompanyDelete])],
})
export class CompanyDeletedModule {}
