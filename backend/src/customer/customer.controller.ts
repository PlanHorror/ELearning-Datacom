import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { CustomerService } from './customer.service';
import { Customer } from './entity/customer.entity';
import { CustomerUpdateDto } from 'src/common/dtos';

@Controller('customer')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.CUSTOMER)
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/profile')
  async getProfile(@GetUser() customer: Customer): Promise<Customer> {
    return await this.customerService.getCustomerById(customer.id);
  }

  @Patch()
  async updateProfile(
    @GetUser() customer: Customer,
    @Body() customerUpdateDto: CustomerUpdateDto,
  ): Promise<Customer> {
    return await this.customerService.updateCustomerService(
      customer,
      customerUpdateDto,
    );
  }

  @Delete()
  async deleteProfile(@GetUser() customer: Customer): Promise<void> {
    return await this.customerService.deleteCustomerService(customer);
  }
}
