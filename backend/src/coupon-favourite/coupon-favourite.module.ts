import { Module } from '@nestjs/common';
import { CouponFavouriteService } from './coupon-favourite.service';
import { CouponFavouriteController } from './coupon-favourite.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponFavourite } from './entity/coupon-favourite.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CouponModule } from 'src/coupon/coupon.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CouponFavourite]),
    AuthModule,
    CouponModule,
  ],
  providers: [CouponFavouriteService],
  controllers: [CouponFavouriteController],
})
export class CouponFavouriteModule {}
