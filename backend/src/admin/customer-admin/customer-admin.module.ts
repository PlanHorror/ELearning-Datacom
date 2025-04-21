import { Module } from '@nestjs/common';
import { CustomerAdminController } from './customer-admin.controller';
import { CustomerAdminService } from './customer-admin.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/customer/entity/customer.entity';

@Module({
  controllers: [CustomerAdminController],
  providers: [CustomerAdminService],
  imports: [AuthModule, TypeOrmModule.forFeature([Customer])],
  exports: [CustomerAdminService],
})
export class CustomerAdminModule {}
