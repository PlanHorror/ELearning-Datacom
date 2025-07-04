import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { CustomerAdminModule } from './customer-admin/customer-admin.module';
import { AccountAdminModule } from './account-admin/account-admin.module';
import { CustomerDeletedAdminModule } from './customer-admin/customer-deleted-admin/customer-deleted-admin.module';
import { CouponFavouriteAdminModule } from './coupon-admin/coupon-favourite-admin/coupon-favourite-admin.module';
import { CouponLabelAdminModule } from './coupon-admin/coupon-label-admin/coupon-label-admin.module';
import { CompanyAdminModule } from './company-admin/company-admin.module';
import { CompanyDeletedAdminModule } from './company-admin/company-deleted-admin/company-deleted-admin.module';
import { CouponUsageAdminModule } from './coupon-admin/coupon-usage-admin/coupon-usage-admin.module';
import { PointsHistoryAdminModule } from './points-history-admin/points-history-admin.module';
import { LearningStatusAdminModule } from './learning-status-admin/learning-status-admin.module';
import { AuthAdminModule } from './auth-admin/auth-admin.module';

@Module({
  providers: [AdminService],
  controllers: [AdminController],
  imports: [
    CustomerAdminModule,
    AccountAdminModule,
    CustomerDeletedAdminModule,
    CouponFavouriteAdminModule,
    CouponLabelAdminModule,
    CompanyAdminModule,
    CompanyDeletedAdminModule,
    CouponUsageAdminModule,
    PointsHistoryAdminModule,
    LearningStatusAdminModule,
    AuthAdminModule,
  ],
})
export class AdminModule {}
