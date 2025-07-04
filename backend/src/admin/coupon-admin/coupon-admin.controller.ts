import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CouponAdminService } from './coupon-admin.service';
import { CouponAdminDto, FilterCouponDto } from 'src/common/dtos/admin';
import { FileInterceptor } from '@nestjs/platform-express';
import { CouponImageOption } from 'src/common/interceptors';
import { Coupon } from 'src/coupon/entity/coupon.entity';
import { ApiQuery } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';

@UseGuards(AuthGuard(), RolesGuard)
@Roles(Role.ADMIN)
@Controller('admin/coupon')
export class CouponAdminController {
  constructor(private couponService: CouponAdminService) {}

  @Get()
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'ID of the coupon',
  })
  async getCoupons(@Query('id') id?: string) {
    return await this.couponService.getCouponsService(id);
  }

  @Get('filter')
  async getCouponsByFilter(
    @Query() filter: FilterCouponDto,
  ): Promise<Coupon[]> {
    return await this.couponService.getCouponsByFilterService(filter);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', CouponImageOption))
  async createCoupon(
    @Body() data: CouponAdminDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.couponService.createCouponService(data, image);
  }

  @Patch('/:id')
  @UseInterceptors(FileInterceptor('image', CouponImageOption))
  async updateCoupon(
    @Body() data: CouponAdminDto,
    @Param('id') id: string,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    return await this.couponService.updateCouponService(data, id, image);
  }

  @Delete('/:id')
  async deleteCoupon(@Param('id') id: string) {
    return await this.couponService.deleteCouponService(id);
  }
}
