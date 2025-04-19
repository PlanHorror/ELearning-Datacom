import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CustomerAdminService } from './customer-admin.service';
import { CustomerEntityDto } from 'src/common/dtos/admin';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Role } from 'src/common/enums';
import { Customer } from 'src/auth/entity/customer.entity';
import { ApiQuery } from '@nestjs/swagger';

@Controller('admin/customer')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
export class CustomerAdminController {
  constructor(private customerService: CustomerAdminService) {}

  @Get()
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'ID of the customer',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Email of the customer',
  })
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
    @Param('id') id: string,
    @Body() data: CustomerEntityDto,
  ): Promise<Customer> {
    return await this.customerService.updateService(data, id);
  }

  @Delete('/:id')
  async deleteCustomer(@Param('id') id: string) {
    return await this.customerService.deleteService(id);
  }
}
