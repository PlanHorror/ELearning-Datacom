import { Module } from '@nestjs/common';
import { CustomerDeletedAdminController } from './customer-deleted-admin.controller';
import { CustomerDeletedAdminService } from './customer-deleted-admin.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerDelete } from 'src/customer/entity/customer-delete.entity';

@Module({
  controllers: [CustomerDeletedAdminController],
  providers: [CustomerDeletedAdminService],
  imports: [AuthModule, TypeOrmModule.forFeature([CustomerDelete])],
})
export class CustomerDeletedAdminModule {}
