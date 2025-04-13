import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CustomerModule } from './customer/customer.module';
import { CompanyModule } from './company/company.module';
import { AccountDeletedController } from './account.deleted/account.deleted.controller';
import { AccountDeletedService } from './account.deleted/account.deleted.service';
import { AccountDeletedModule } from './account.deleted/account.deleted.module';
import { AccountModule } from './account/account.module';
import { CouponService } from './coupon/coupon.service';
import { CouponController } from './coupon/coupon.controller';
import { CouponModule } from './coupon/coupon.module';
import { CouponLabelModule } from './coupon-label/coupon-label.module';
import { CouponFavouriteService } from './coupon-favourite/coupon-favourite.service';
import { CouponFavouriteController } from './coupon-favourite/coupon-favourite.controller';
import { CouponFavouriteModule } from './coupon-favourite/coupon-favourite.module';
import { CouponUsageModule } from './coupon-usage/coupon-usage.module';
import { PointsHistoryModule } from './points-history/points-history.module';
import { CompanyDeleteController } from './company-delete/company-delete.controller';
import { CompanyDeletedController } from './company-deleted/company-deleted.controller';
import { CompanyDeletedService } from './company-deleted/company-deleted.service';
import { CompanyDeletedModule } from './company-deleted/company-deleted.module';
import { CustomerDeletedService } from './customer-deleted/customer-deleted.service';
import { CustomerDeletedModule } from './customer-deleted/customer-deleted.module';

@Module({
  providers: [AdminService, AccountDeletedService, CouponService, CouponFavouriteService, CompanyDeletedService, CustomerDeletedService],
  controllers: [AdminController, AccountDeletedController, CouponController, CouponFavouriteController, CompanyDeleteController, CompanyDeletedController],
  imports: [CustomerModule, CompanyModule, AccountDeletedModule, AccountModule, CouponModule, CouponLabelModule, CouponFavouriteModule, CouponUsageModule, PointsHistoryModule, CompanyDeletedModule, CustomerDeletedModule]
})
export class AdminModule {}
