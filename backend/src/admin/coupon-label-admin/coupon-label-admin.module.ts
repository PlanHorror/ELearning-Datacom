import { Module } from '@nestjs/common';
import { CouponLabelAdminController } from './coupon-label-admin.controller';
import { CouponLabelAdminService } from './coupon-label-admin.service';

@Module({
  controllers: [CouponLabelAdminController],
  providers: [CouponLabelAdminService]
})
export class CouponLabelAdminModule {}
