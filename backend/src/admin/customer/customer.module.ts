import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from 'src/auth/entity/customer.entity';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
  imports: [AuthModule, TypeOrmModule.forFeature([Customer])],
})
export class CustomerModule {}
