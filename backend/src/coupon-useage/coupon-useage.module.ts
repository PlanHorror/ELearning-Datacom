import { Module } from '@nestjs/common';
import { CouponUseageController } from './coupon-useage.controller';
import { CouponUseageService } from './coupon-useage.service';

@Module({
  controllers: [CouponUseageController],
  providers: [CouponUseageService]
})
export class CouponUseageModule {}
