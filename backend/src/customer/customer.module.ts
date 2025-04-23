import { forwardRef, Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { CustomerDelete } from './entity/customer-delete.entity';

@Module({
  providers: [CustomerService],
  controllers: [CustomerController],
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([Customer, CustomerDelete]),
  ],
  exports: [CustomerService],
})
export class CustomerModule {}
