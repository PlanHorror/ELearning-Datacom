import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CustomeAdminrModule } from './customer-admin/customer-admin.module';
import { AccountAdminModule } from './account/account.module';
import { CustomerDeletedAdminModule } from './customer-deleted-admin/customer-deleted-admin.module';
import { CouponFavouriteAdminModule } from './coupon-favourite-admin/coupon-favourite-admin.module';
import { CouponLabelAdminModule } from './coupon-label-admin/coupon-label-admin.module';
import { CompanyAdminModule } from './company-admin/company-admin.module';
import { CompanyDeletedAdminModule } from './company-deleted-admin/company-deleted-admin.module';
import { CouponUsageAdminModule } from './coupon-usage-admin/coupon-usage-admin.module';
import { PointsHistoryAdminModule } from './points-history-admin/points-history-admin.module';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [
    CustomeAdminrModule,
    AccountAdminModule,
    CustomerDeletedAdminModule,
    CouponFavouriteAdminModule,
    CouponLabelAdminModule,
    CompanyAdminModule,
    CompanyDeletedAdminModule,
    CouponUsageAdminModule,
    PointsHistoryAdminModule,
  ],
})
export class AdminModule {}
