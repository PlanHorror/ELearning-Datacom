import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CouponUseageService } from './coupon-useage.service';
import { GetUser, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Customer } from 'src/auth/entity/customer.entity';
import { CouponUsage } from './entity/coupon-usage.entity';

@Controller('coupon-useage')
export class CouponUseageController {
  constructor(private couponUseageService: CouponUseageService) {}

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
    id: string,
  ): Promise<CouponUsage> {
    return this.couponUseageService.getCouponUsageById(customer, id);
  }

  @Post()
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async useCoupon(
    @GetUser() customer: Customer,
    couponId: string,
  ): Promise<CouponUsage> {
    return this.couponUseageService.createCouponUsage(customer, couponId);
  }
}
