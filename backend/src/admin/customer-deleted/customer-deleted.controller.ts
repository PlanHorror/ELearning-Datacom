import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CustomerDeletedService } from './customer-deleted.service';
import { CustomerDeletedEntityDto } from 'src/common/dtos/admin';

@Controller('admin/customer-deleted')
export class CustomerDeletedController {
  constructor(private customerDeletedService: CustomerDeletedService) {}

  @Get()
  async getDeletedCustomers(
    @Query('id') id?: string,
    @Query('email') email?: string,
    @Query('old_id') old_id?: string,
  ) {
    return await this.customerDeletedService.getDeletedCustomersService(
      id,
      email,
      old_id,
    );
  }

  @Post()
  async createDeletedCustomer(@Body() data: CustomerDeletedEntityDto) {
    return await this.customerDeletedService.createDeletedCustomerService(data);
  }

  @Patch('/:id')
  async updateDeletedCustomer(
    @Param('id') id: string,
    @Body() data: CustomerDeletedEntityDto,
  ) {
    return await this.customerDeletedService.updateDeletedCustomerService(
      id,
      data,
    );
  }

  @Delete('/:id')
  async deleteDeletedCustomer(@Param('id') id: string) {
    return await this.customerDeletedService.deleteDeletedCustomerService(id);
  }
}
