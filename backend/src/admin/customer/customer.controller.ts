import { Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerEntityDto } from 'src/common/dtos/admin';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getCustomers(@Query('id') id?: string, @Query('email') email?: string) {
    return await this.customerService.getCustomersService(id, email);
  }

  @Post()
  async createCustomer(@Query() data: CustomerEntityDto) {
    return await this.customerService.createService(data);
  }

  @Patch('/:id')
  async updateCustomer(
    @Query('id') id: string,
    @Query() data: CustomerEntityDto,
  ) {
    return await this.customerService.updateService(data, id);
  }

  @Delete('/:id')
  async deleteCustomer(@Query('id') id: string) {
    return await this.customerService.deleteService(id);
  }
}
