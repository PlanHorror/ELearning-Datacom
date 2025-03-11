import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponUsage } from './entity/coupon-usage.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/auth/entity/customer.entity';
import { CouponService } from 'src/coupon/coupon.service';
import { AuthService } from 'src/auth/auth.service';
import { PointsHistoryService } from 'src/points-history/points-history.service';
import { CouponHistoryType } from 'src/common/enums';

@Injectable()
export class CouponUseageService {
  constructor(
    @InjectRepository(CouponUsage)
    private couponUsageRepository: Repository<CouponUsage>,
    private couponService: CouponService,
    private authSercive: AuthService,
    private pointsHistoryService: PointsHistoryService,
  ) {}

  // Get coupon usage by id
  async getCouponUsageById(
    customer: Customer,
    id: string,
  ): Promise<CouponUsage> {
    if (!id) {
      throw new NotFoundException('Coupon usage not found');
    }
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    try {
      const couponUsage = await this.couponUsageRepository.findOne({
        where: { id },
        relations: ['coupon'],
      });
      if (!couponUsage) {
        throw new NotFoundException('Coupon usage not found');
      }
      if (couponUsage.customer.id !== customer.id) {
        throw new NotFoundException('Coupon usage not found');
      }
      return couponUsage;
    } catch (error) {
      throw new NotFoundException('Coupon usage not found');
    }
  }

  // Get coupon usage by customer
  async getCouponUsageByCustomer(customer: Customer): Promise<CouponUsage[]> {
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return await this.couponUsageRepository.find({
      where: { customer },
      relations: ['coupon'],
    });
  }

  // Create coupon usage
  async createCouponUsage(
    customer: Customer,
    couponId: string,
  ): Promise<CouponUsage> {
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    if (!couponId) {
      throw new NotFoundException('Coupon not found');
    }
    const coupon = await this.couponService.getCouponById(couponId);
    if (!this.couponService.validateCoupon(coupon)) {
      await this.couponService.setCouponStatus(coupon);
      throw new NotFoundException('Coupon expired or has been used');
    }
    if (coupon.use_point > customer.points) {
      throw new NotFoundException('Not enough points to redeem this coupon');
    }

    const newCouponUsage = this.couponUsageRepository.create({
      customer,
      coupon,
    });
    try {
      await this.couponUsageRepository.save(newCouponUsage);
      await this.authSercive.subtractPoints(customer, coupon.use_point);
      await this.pointsHistoryService.createPointsHistory(
        customer,
        coupon.use_point,
        'Redeem coupon',
        CouponHistoryType.SUBTRACT,
      );
      return newCouponUsage;
    } catch (error) {
      throw error.code === '23505'
        ? new NotFoundException('This coupon is already used')
        : new InternalServerErrorException();
    }
  }
}
