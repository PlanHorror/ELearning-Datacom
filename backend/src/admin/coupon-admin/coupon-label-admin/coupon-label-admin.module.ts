import { Module } from '@nestjs/common';
import { CouponLabelAdminController } from './coupon-label-admin.controller';
import { CouponLabelAdminService } from './coupon-label-admin.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponLabel } from 'src/coupon/coupon-label/entity/coupon-label.entity';

@Module({
  controllers: [CouponLabelAdminController],
  providers: [CouponLabelAdminService],
  imports: [AuthModule, TypeOrmModule.forFeature([CouponLabel])],
  exports: [CouponLabelAdminService],
})
export class CouponLabelAdminModule {}
