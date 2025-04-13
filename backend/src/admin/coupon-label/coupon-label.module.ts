import { Module } from '@nestjs/common';
import { CouponLabelController } from './coupon-label.controller';
import { CouponLabelService } from './coupon-label.service';

@Module({
  controllers: [CouponLabelController],
  providers: [CouponLabelService]
})
export class CouponLabelModule {}
