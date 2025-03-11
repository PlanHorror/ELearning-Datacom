import { Module } from '@nestjs/common';
import { CouponUseageController } from './coupon-useage.controller';
import { CouponUseageService } from './coupon-useage.service';
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
  controllers: [CouponUseageController],
  providers: [CouponUseageService],
})
export class CouponUseageModule {}
