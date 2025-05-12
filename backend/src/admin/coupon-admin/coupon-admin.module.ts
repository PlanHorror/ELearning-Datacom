import { Module } from '@nestjs/common';
import { CouponAdminService } from './coupon-admin.service';
import { CouponAdminController } from './coupon-admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from 'src/coupon/entity/coupon.entity';
import { CompanyAdminModule } from '../company-admin/company-admin.module';
import { CouponLabelAdminModule } from './coupon-label-admin/coupon-label-admin.module';

@Module({
  providers: [CouponAdminService],
  controllers: [CouponAdminController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Coupon]),
    CompanyAdminModule,
    CouponLabelAdminModule,
  ],
  exports: [CouponAdminService],
})
export class CouponAdminModule {}
