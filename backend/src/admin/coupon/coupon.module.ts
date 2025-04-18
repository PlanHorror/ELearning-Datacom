import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/coupon/entity/coupon.entity';

@Module({
  providers: [CouponService],
  controllers: [CouponController],
  imports: [AuthModule, TypeOrmModule.forFeature([Coupon])],
})
export class CouponModule {}
