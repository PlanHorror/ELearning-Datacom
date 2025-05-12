import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponUsage } from './entity/coupon-usage.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entity/customer.entity';
import { CouponService } from 'src/coupon/coupon.service';
import { AuthService } from 'src/auth/auth.service';
import { PointsHistoryService } from 'src/points-history/points-history.service';
import { CouponUsageStatus, PointsHistoryType } from 'src/common/enums';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CouponUsageService {
  constructor(
    @InjectRepository(CouponUsage)
    private couponUsageRepository: Repository<CouponUsage>,
    private couponService: CouponService,
    private authSercive: AuthService,
    private pointsHistoryService: PointsHistoryService,
  ) {}

  // Get all coupon usage
  async getAllCouponUsage(): Promise<CouponUsage[]> {
    return await this.couponUsageRepository.find({
      relations: ['coupon', 'customer'],
    });
  }
  // Get coupon usage by id
  async getCouponUsageById(id: string): Promise<CouponUsage> {
    if (!id) {
      throw new NotFoundException('Coupon usage not found');
    }
    try {
      const couponUsage = await this.couponUsageRepository.findOne({
        where: { id },
        relations: ['coupon'],
      });
      if (!couponUsage) {
        throw new NotFoundException('Coupon usage not found');
      }
      return couponUsage;
    } catch (error) {
      throw new NotFoundException('Coupon usage not found');
    }
  }

  // Get coupon usage by id with customer permission
  async getCouponUsageByIdService(
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
      where: { customer: { id: customer.id } },
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
      await this.pointsHistoryService.createPointsHistory(
        customer,
        coupon.use_point,
        'Redeem coupon',
        PointsHistoryType.SUBTRACT,
      );
      await this.couponUsageRepository.save(newCouponUsage);
      return newCouponUsage;
    } catch (error) {
      throw error.code === '23505'
        ? new NotFoundException('This coupon is already used')
        : new InternalServerErrorException();
    }
  }

  // Change coupon usage status
  async changeCouponUsageStatus(id: string): Promise<CouponUsage> {
    if (!id) {
      throw new NotFoundException('Coupon usage not found');
    }
    const couponUsage = await this.getCouponUsageById(id);
    const now = new Date();
    if (
      couponUsage.status === CouponUsageStatus.USED ||
      couponUsage.status === CouponUsageStatus.EXPIRED
    ) {
      return couponUsage;
    } else {
      if (couponUsage.coupon.period_end < now) {
        couponUsage.status = CouponUsageStatus.EXPIRED;
        return await this.couponUsageRepository.save(couponUsage);
      }
      return couponUsage;
    }
  }

  @Cron(CronExpression.EVERY_9_HOURS)
  async changeAllCouponUsageStatus() {
    console.log('Change coupon usage staus');
    const couponUsages = await this.getAllCouponUsage();
    for (const couponUsage of couponUsages) {
      if (couponUsage.status == CouponUsageStatus.UNUSED) {
        await this.changeCouponUsageStatus(couponUsage.id);
      }
    }
  }
}
