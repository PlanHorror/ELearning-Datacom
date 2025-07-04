import { Module } from '@nestjs/common';
import { CouponUsageController } from './coupon-usage.controller';
import { CouponUsageService } from './coupon-usage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponUsage } from './entity/coupon-usage.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CouponModule } from 'src/coupon/coupon.module';
import { PointsHistoryModule } from 'src/points-history/points-history.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CouponUsage]),
    AuthModule,
    CouponModule,
    PointsHistoryModule,
  ],
  controllers: [CouponUsageController],
  providers: [CouponUsageService],
})
export class CouponUsageModule {}
