import { Module } from '@nestjs/common';
import { CouponUsageAdminService } from './coupon-usage-admin.service';
import { CouponUsageAdminController } from './coupon-usage-admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponFavourite } from 'src/coupon-favourite/entity/coupon-favourite.entity';
import { CouponAdminModule } from '../coupon-admin/coupon-admin.module';

@Module({
  providers: [CouponUsageAdminService],
  controllers: [CouponUsageAdminController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CouponFavourite]),
    CouponAdminModule,
  ],
})
export class CouponUsageAdminModule {}
