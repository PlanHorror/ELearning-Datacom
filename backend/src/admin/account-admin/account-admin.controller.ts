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
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { AccountAdminService } from './account-admin.service';
import { Admin } from 'src/auth/entity/admin.entity';
import { AccountAdminDto } from 'src/common/dtos/admin';
import { ApiPropertyOptional, ApiQuery } from '@nestjs/swagger';

@Controller('admin/account')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
export class AccountAdminController {
  constructor(private accountService: AccountAdminService) {}

  @Get()
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'ID of the admin account',
  })
  @ApiQuery({
    name: 'username',
    required: false,
    description: 'Username of the admin account',
  })
  async getAccount(
    @Query('id') id: string,
    @Query('username') username: string,
  ): Promise<Admin[] | Admin> {
    return await this.accountService.getAdminsService(id, username);
  }

  @Post()
  async createAccount(@Body() data: AccountAdminDto): Promise<Admin> {
    return await this.accountService.createService(data);
  }

  @Patch('/:id')
  async updateAccount(
    @Param('id') id: string,
    @Body() data: AccountAdminDto,
  ): Promise<Admin> {
    return await this.accountService.updateService(data, id);
  }

  @Delete('/:id')
  async deleteAccount(@Param('id') id: string): Promise<void> {
    return await this.accountService.deleteService(id);
  }
}
