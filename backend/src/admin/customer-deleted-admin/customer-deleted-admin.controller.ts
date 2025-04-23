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
import { CustomerDeletedAdminService } from './customer-deleted-admin.service';
import { CustomerDeletedEntityDto } from 'src/common/dtos/admin';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { ApiQuery } from '@nestjs/swagger';

@Controller('admin/customer-deleted')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
export class CustomerDeletedAdminController {
  constructor(private customerDeletedService: CustomerDeletedAdminService) {}

  @Get()
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'ID of the deleted customer',
  })
  @ApiQuery({
    name: 'old_id',
    required: false,
    description: 'Old ID of the deleted customer',
  })
  @ApiQuery({
    name: 'email',
    required: false,
    description: 'Email of the deleted customer',
  })
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
