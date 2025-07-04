import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CouponUsageService } from './coupon-usage.service';
import { GetUser, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Customer } from 'src/customer/entity/customer.entity';
import { CouponUsage } from './entity/coupon-usage.entity';
import { IdDto } from 'src/common/dtos';

@Controller('coupon/usage')
export class CouponUsageController {
  constructor(private couponUseageService: CouponUsageService) {}

  @Get()
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async getCouponUsageByCustomer(
    @GetUser() customer: Customer,
  ): Promise<CouponUsage[]> {
    return this.couponUseageService.getCouponUsageByCustomer(customer);
  }

  @Get(':id')
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async getCouponUsageById(
    @GetUser() customer: Customer,
    @Body() idString: IdDto,
  ): Promise<CouponUsage> {
    const { id } = idString;
    return this.couponUseageService.getCouponUsageByIdService(customer, id);
  }

  @Post()
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async useCoupon(
    @GetUser() customer: Customer,
    @Body() idString: IdDto,
  ): Promise<CouponUsage> {
    const { id: couponId } = idString;
    return this.couponUseageService.createCouponUsage(customer, couponId);
  }
}
