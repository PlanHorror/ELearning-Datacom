import { Module } from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponController } from './coupon.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponLabel } from './coupon-label/entity/coupon-label.entity';
import { Coupon } from './entity/coupon.entity';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from 'src/auth/auth.module';
import { CouponLabelModule } from 'src/coupon/coupon-label/coupon-label.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Coupon]),
    MulterModule.register({
      dest: './uploads',
    }),
    AuthModule,
    CouponLabelModule,
    CloudinaryModule,
  ],
  providers: [CouponService],
  controllers: [CouponController],
  exports: [CouponService],
})
export class CouponModule {}
