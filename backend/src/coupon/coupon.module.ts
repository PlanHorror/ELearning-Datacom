import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponLabel } from './entity/coupon-label.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CouponLabel])],
  providers: [CouponService],
  controllers: [CouponController],
})
export class CouponModule {}
