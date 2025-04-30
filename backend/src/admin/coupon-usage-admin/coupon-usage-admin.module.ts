import { Module } from '@nestjs/common';
import { CouponUsageAdminService } from './coupon-usage-admin.service';
import { CouponUsageAdminController } from './coupon-usage-admin.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponAdminModule } from '../coupon-admin/coupon-admin.module';
import { CouponUsage } from 'src/coupon/coupon-usage/entity/coupon-usage.entity';
import { CustomerAdminModule } from '../customer-admin/customer-admin.module';

@Module({
  providers: [CouponUsageAdminService],
  controllers: [CouponUsageAdminController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([CouponUsage]),
    CouponAdminModule,
    CustomerAdminModule,
  ],
})
export class CouponUsageAdminModule {}
