import {
  BadRequestException,
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
import { CouponLabelService } from './coupon-label.service';
import { CouponLabel } from './entity/coupon-label.entity';
import { ApiQuery } from '@nestjs/swagger';

@Controller('coupon/label')
export class CouponLabelController {
  constructor(private couponLabelService: CouponLabelService) {}

  @Get()
  getLabels() {
    return this.couponLabelService.getLabels();
  }

  @Get('/find')
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'Name of the coupon label',
  })
  @ApiQuery({
    name: 'id',
    required: false,
    description: 'ID of the coupon label',
  })
  async findLabel(
    @Query('name') name?: string,
    @Query('id') id?: string,
  ): Promise<CouponLabel | CouponLabel[]> {
    if (name && id) {
      throw new BadRequestException('Provide only one query parameter');
    } else if (name) {
      return await this.couponLabelService.getLabelByName(name);
    } else if (id) {
      return await this.couponLabelService.getLabelById(id);
    } else {
      return await this.couponLabelService.getLabels();
    }
  }
}
