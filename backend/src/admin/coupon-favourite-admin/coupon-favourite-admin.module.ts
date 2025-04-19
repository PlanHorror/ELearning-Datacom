import { Module } from '@nestjs/common';
import { CouponFavouriteAdminController } from './coupon-favourite-admin.controller';
import { CouponFavouriteAdminService } from './coupon-favourite-admin.service';

@Module({
  controllers: [CouponFavouriteAdminController],
  providers: [CouponFavouriteAdminService]
})
export class CouponFavouriteAdminModule {}
