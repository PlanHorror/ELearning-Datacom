import { Module } from '@nestjs/common';
import { CouponFavouriteAdminController } from './coupon-favourite-admin.controller';
import { CouponFavouriteAdminService } from './coupon-favourite-admin.service';
import { CouponAdminModule } from '../coupon-admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CouponFavourite } from 'src/coupon/coupon-favourite/entity/coupon-favourite.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CustomerAdminModule } from '../../customer-admin/customer-admin.module';

@Module({
  controllers: [CouponFavouriteAdminController],
  providers: [CouponFavouriteAdminService],
  imports: [
    AuthModule,
    CouponAdminModule,
    CustomerAdminModule,
    TypeOrmModule.forFeature([CouponFavourite]),
  ],
})
export class CouponFavouriteAdminModule {}
