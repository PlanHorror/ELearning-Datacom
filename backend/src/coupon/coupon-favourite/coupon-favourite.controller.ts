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
import { Customer } from 'src/customer/entity/customer.entity';
import { Role } from 'src/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { CustomerStrategyInterface } from 'src/common/interfaces';
import { CouponFavourite } from './entity/coupon-favourite.entity';
import { IdDto } from 'src/common/dtos';

@Controller('coupon/favourite')
export class CouponFavouriteController {
  constructor(private couponFavouriteService: CouponFavouriteService) {}

  // Get coupon favourites
  @Get()
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async getCouponFavourites(
    @GetUser() customer: Customer,
  ): Promise<CouponFavourite[]> {
    // console.log(customer, 'customer');
    return this.couponFavouriteService.getCouponFavouritesByCustomer(customer);
  }

  // Create coupon favourite
  @Post()
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async createCouponFavourite(
    @GetUser() customer: Customer,
    @Body() couponFavouriteDto: IdDto,
  ): Promise<CouponFavourite> {
    const { id } = couponFavouriteDto;
    // console.log(customer, 'customer');
    return this.couponFavouriteService.createCouponFavourite(customer, id);
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
