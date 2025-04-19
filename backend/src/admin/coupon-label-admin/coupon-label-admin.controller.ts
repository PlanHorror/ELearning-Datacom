import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CouponLabelAdminService } from './coupon-label-admin.service';
import { CouponLabel } from 'src/coupon-label/entity/coupon-label.entity';
import { CouponLabelDto } from 'src/common/dtos/admin';
import { ApiQuery } from '@nestjs/swagger';

@Controller('coupon-label-admin')
export class CouponLabelAdminController {
  constructor(private couponLabelAdminService: CouponLabelAdminService) {}

  @Get()
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'ID of the coupon label',
  })
  @ApiQuery({
    name: 'label',
    required: false,
    description: 'Label of the coupon label',
  })
  getCouponLabels(
    @Query('id') id?: string,
    @Query('label') label?: string,
  ): Promise<CouponLabel[] | CouponLabel> {
    return this.couponLabelAdminService.getCouponLabelService(id, label);
  }

  @Post()
  createCouponLabel(@Body() data: CouponLabelDto): Promise<CouponLabel> {
    return this.couponLabelAdminService.createCouponLabelService(data);
  }

  @Patch('/:id')
  updateCouponLabel(
    @Param('id') id: string,
    @Body() data: CouponLabelDto,
  ): Promise<CouponLabel> {
    return this.couponLabelAdminService.updateCouponLabelService(id, data);
  }

  @Delete('/:id')
  deleteCouponLabel(@Param('id') id: string): Promise<void> {
    return this.couponLabelAdminService.deleteCouponLabelService(id);
  }
}
