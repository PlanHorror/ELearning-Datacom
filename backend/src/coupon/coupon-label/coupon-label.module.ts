import { Module } from '@nestjs/common';
import { CouponLabelController } from './coupon-label.controller';
import { CouponLabelService } from './coupon-label.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponLabel } from './entity/coupon-label.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([CouponLabel]), AuthModule],
  controllers: [CouponLabelController],
  providers: [CouponLabelService],
  exports: [CouponLabelService],
})
export class CouponLabelModule {}
