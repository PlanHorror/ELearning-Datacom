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
import { CouponUsageAdminService } from './coupon-usage-admin.service';
import { CouponUsageDto } from 'src/common/dtos/admin';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin/coupon-usage')
export class CouponUsageAdminController {
  constructor(private couponUsageService: CouponUsageAdminService) {}

  @Get()
  async getAllCouponUsage() {
    return await this.couponUsageService.getAllCouponUsage();
  }

  @Get('filter')
  @ApiQuery({
    name: 'customerId',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'couponId',
    required: false,
    type: String,
  })
  async getCouponUsageByCustomerId(
    @Query('customerId') customerId?: string,
    @Query('couponId') couponId?: string,
  ) {
    return await this.couponUsageService.filterCouponUsageService(
      customerId,
      couponId,
    );
  }

  @Get('find/:id')
  async getCouponUsageById(@Param('id') id: string) {
    return await this.couponUsageService.getCouponUsageById(id);
  }

  @Post()
  async createCouponUsage(@Body() couponUsage: CouponUsageDto) {
    return await this.couponUsageService.createCouponUsageService(couponUsage);
  }

  @Patch('/:id')
  async updateCouponUsage(
    @Param('id') id: string,
    @Body() couponUsage: CouponUsageDto,
  ) {
    return await this.couponUsageService.updateCouponUsageService(
      id,
      couponUsage,
    );
  }

  @Delete('/:id')
  async deleteCouponUsage(@Param('id') id: string) {
    return await this.couponUsageService.deleteCouponUsage(id);
  }
}
