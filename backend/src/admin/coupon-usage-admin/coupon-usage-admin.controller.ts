import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CouponUsageAdminService } from './coupon-usage-admin.service';
import { CouponUsageDto } from 'src/common/dtos/admin';

@Controller('admin/coupon-usage')
export class CouponUsageAdminController {
  constructor(private couponUsageService: CouponUsageAdminService) {}

  @Get()
  async getAllCouponUsage() {
    return await this.couponUsageService.getAllCouponUsage();
  }

  @Get('/:id')
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
