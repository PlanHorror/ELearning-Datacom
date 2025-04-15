import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerEntityDto } from 'src/common/dtos/admin';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Role } from 'src/common/enums';
import { Customer } from 'src/auth/entity/customer.entity';

@Controller('admin/customer')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async getCustomers(
    @Query('id') id?: string,
    @Query('email') email?: string,
  ): Promise<Customer[] | Customer> {
    return await this.customerService.getCustomersService(id, email);
  }

  @Post()
  async createCustomer(@Body() data: CustomerEntityDto): Promise<Customer> {
    return await this.customerService.createService(data);
  }

  @Patch('/:id')
  async updateCustomer(
    @Query('id') id: string,
    @Body() data: CustomerEntityDto,
  ): Promise<Customer> {
    return await this.customerService.updateService(data, id);
  }

  @Delete('/:id')
  async deleteCustomer(@Query('id') id: string) {
    return await this.customerService.deleteService(id);
  }
}
