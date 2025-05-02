import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CouponFavouriteAdminService } from './coupon-favourite-admin.service';
import { CouponFavourite } from 'src/coupon/coupon-favourite/entity/coupon-favourite.entity';
import {
  CouponFavouriteDto,
  FilterCouponFavouriteDto,
} from 'src/common/dtos/admin';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin/coupon/favourite')
export class CouponFavouriteAdminController {
  constructor(private couponFavouriteService: CouponFavouriteAdminService) {}

  @Get()
  async getAllCouponFavourites(): Promise<CouponFavourite[]> {
    return await this.couponFavouriteService.getAllCouponFavourites();
  }

  @Get('find/:id')
  async getCouponFavouriteById(
    @Param('id') id: string,
  ): Promise<CouponFavourite> {
    return await this.couponFavouriteService.getCouponFavouriteById(id);
  }

  @Get('filter')
  @ApiQuery({
    name: 'customer_id',
    required: false,
    description: 'ID of the customer',
  })
  @ApiQuery({
    name: 'coupon_id',
    required: false,
    description: 'ID of the coupon',
  })
  async getCouponFavourites(
    @Query() filter: FilterCouponFavouriteDto,
  ): Promise<CouponFavourite[]> {
    return await this.couponFavouriteService.filterCouponFavouriteService(
      filter,
    );
  }

  @Post()
  async createCouponFavourite(
    @Body() data: CouponFavouriteDto,
  ): Promise<CouponFavourite> {
    return await this.couponFavouriteService.createCouponFavouriteService(data);
  }

  @Patch(':id')
  async updateCouponFavourite(
    @Param('id') id: string,
    @Body() data: CouponFavouriteDto,
  ): Promise<CouponFavourite> {
    return await this.couponFavouriteService.updateCouponFavouriteService(
      data,
      id,
    );
  }

  @Delete(':id')
  async deleteCouponFavourite(@Param('id') id: string): Promise<void> {
    return await this.couponFavouriteService.deleteCouponFavouriteService(id);
  }
}
