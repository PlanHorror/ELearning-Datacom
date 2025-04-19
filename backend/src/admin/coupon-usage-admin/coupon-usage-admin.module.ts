import { Module } from '@nestjs/common';
import { CouponUsageAdminService } from './coupon-usage-admin.service';
import { CouponUsageAdminController } from './coupon-usage-admin.controller';

@Module({
  providers: [CouponUsageAdminService],
  controllers: [CouponUsageAdminController]
})
export class CouponUsageAdminModule {}
