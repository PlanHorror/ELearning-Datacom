import { Module } from '@nestjs/common';
import { CouponLabelController } from './coupon-label.controller';
import { CouponLabelService } from './coupon-label.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponLabel } from './entity/coupon-label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponLabel])],
  controllers: [CouponLabelController],
  providers: [CouponLabelService],
  exports: [CouponLabelService],
})
export class CouponLabelModule {}
