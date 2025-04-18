import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { AccountService } from './account.service';
import { Admin } from 'src/auth/entity/admin.entity';
import { AccountDto } from 'src/common/dtos/admin';

@Controller('admin/account')
@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get()
  async getAccount(
    @Query('id') id: string,
    @Query('username') username: string,
  ): Promise<Admin[] | Admin> {
    return await this.accountService.getAdminsService(id, username);
  }

  @Patch('/:id')
  async updateAccount(
    @Param('id') id: string,
    @Body() data: AccountDto,
  ): Promise<Admin> {
    return await this.accountService.updateService(data, id);
  }

  @Delete('/:id')
  async deleteAccount(@Param('id') id: string): Promise<void> {
    return await this.accountService.deleteService(id);
  }
}
