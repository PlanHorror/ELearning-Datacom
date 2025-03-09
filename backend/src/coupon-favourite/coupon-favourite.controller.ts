import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CouponFavouriteService } from './coupon-favourite.service';
import { GetUser, Roles } from 'src/common/decorators';
import { Customer } from 'src/auth/entity/customer.entity';
import { Role } from 'src/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { CustomerStrategyInterface } from 'src/common/interfaces';
import { CouponFavourite } from './entity/coupon-favourite.entity';

@Controller('coupon-favourite')
export class CouponFavouriteController {
  constructor(private couponFavouriteService: CouponFavouriteService) {}

  // Get coupon favourites
  @Get()
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async getCouponFavourites(
    @GetUser() customerStrategy: CustomerStrategyInterface,
  ): Promise<CouponFavourite[]> {
    const { customer } = customerStrategy;
    return this.couponFavouriteService.getCouponFavouritesByCustomer(customer);
  }

  // Create coupon favourite
  @Post()
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async createCouponFavourite(
    @GetUser() customerStrategy: CustomerStrategyInterface,
    @Body() couponId: string,
  ): Promise<CouponFavourite> {
    const { customer } = customerStrategy;
    return this.couponFavouriteService.createCouponFavourite(
      customer,
      couponId,
    );
  }

  // Delete coupon favourite
  @Delete('/:id')
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async deleteCouponFavourite(
    @GetUser() customer: Customer,
    @Param('id') id: string,
  ): Promise<void> {
    return this.couponFavouriteService.deleteCouponFavourite(customer, id);
  }
}
