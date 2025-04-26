import { Controller, Get, Param, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { Customer } from './entity/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('profile/:id')
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    return await this.customerService.getCustomerById(id);
  }

  @Get('all')
  async getAllCustomer(): Promise<Customer[]> {
    return await this.customerService.getAllCustomers();
  }
}
