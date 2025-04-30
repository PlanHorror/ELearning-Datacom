import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponUsageDto } from 'src/common/dtos/admin';
import { CouponUsage } from 'src/coupon/coupon-usage/entity/coupon-usage.entity';
import { Repository } from 'typeorm';
import { CustomerAdminService } from '../customer-admin/customer-admin.service';
import { CouponAdminService } from '../coupon-admin/coupon-admin.service';
import { CouponUsageStatus, PointsHistoryType } from 'src/common/enums';
import { Coupon } from 'src/coupon/entity/coupon.entity';
import { Customer } from 'src/customer/entity/customer.entity';

@Injectable()
export class CouponUsageAdminService {
  constructor(
    @InjectRepository(CouponUsage)
    private couponUsageRepository: Repository<CouponUsage>,
    private couponAdminService: CouponAdminService,
    private customerAdminService: CustomerAdminService,
  ) {}

  /*
   * Raw methods
   */

  // Get all coupon usage
  async getAllCouponUsage(): Promise<CouponUsage[]> {
    return await this.couponUsageRepository.find({
      relations: ['customer'],
    });
  }

  // Get coupon usage by id
  async getCouponUsageById(id: string): Promise<CouponUsage> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const couponUsage = await this.couponUsageRepository.findOne({
        where: { id },
        relations: ['customer', 'coupon'],
      });
      if (!couponUsage) {
        throw new NotFoundException('Coupon usage not found');
      }
      return couponUsage;
    } catch (error) {
      throw new NotFoundException('Coupon usage not found');
    }
  }

  // Get coupon usage by customer id
  async getCouponUsageByCustomerId(customerId: string): Promise<CouponUsage[]> {
    if (!customerId) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const couponUsage = await this.couponUsageRepository.find({
        where: { customer: { id: customerId } },
        relations: ['customer', 'coupon'],
      });
      if (!couponUsage) {
        throw new NotFoundException('Coupon usage not found');
      }
      return couponUsage;
    } catch (error) {
      throw new NotFoundException('Coupon usage not found');
    }
  }

  // Get coupon usage by coupon id
  async getCouponUsageByCouponId(couponId: string): Promise<CouponUsage[]> {
    if (!couponId) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const couponUsage = await this.couponUsageRepository.find({
        where: { coupon: { id: couponId } },
        relations: ['customer', 'coupon'],
      });
      if (!couponUsage) {
        throw new NotFoundException('Coupon usage not found');
      }
      return couponUsage;
    } catch (error) {
      throw new NotFoundException('Coupon usage not found');
    }
  }

  // Create coupon usage
  async createCouponUsage(
    coupon: Coupon,
    customer: Customer,
    couponUsage: CouponUsageDto,
  ): Promise<CouponUsage> {
    try {
      const { customer_id, coupon_id, subtract_points, ...data } = couponUsage;
      const newCouponUsage = this.couponUsageRepository.create({
        ...data,
        customer,
        coupon,
      });
      return await this.couponUsageRepository.save(newCouponUsage);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Coupon usage already exists');
      }
      throw new BadRequestException('Error creating coupon usage');
    }
  }

  // Update coupon usage
  async updateCouponUsage(
    id: string,
    couponUsage: CouponUsageDto,
    coupon: Coupon,
    customer: Customer,
  ): Promise<CouponUsage> {
    try {
      const { customer_id, coupon_id, subtract_points, ...data } = couponUsage;
      return await this.couponUsageRepository.save({
        ...data,
        customer,
        coupon,
        id,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Coupon usage already exists');
      }
      throw new BadRequestException('Error updating coupon usage');
    }
  }

  // Delete coupon usage
  async deleteCouponUsage(id: string): Promise<void> {
    try {
      await this.couponUsageRepository.delete(id);
    } catch (error) {
      throw new NotFoundException('Coupon usage not found');
    }
  }

  /*
   * Service methods
   */

  // Filter coupon usage by customer id and coupon id
  async filterCouponUsageService(
    customerId?: string,
    couponId?: string,
  ): Promise<CouponUsage[]> {
    if (customerId && couponId) {
      throw new BadRequestException(
        'You can only filter by customer id or coupon id, not both',
      );
    }
    if (customerId) {
      return await this.getCouponUsageByCustomerId(customerId);
    }
    if (couponId) {
      return await this.getCouponUsageByCouponId(couponId);
    }
    return await this.getAllCouponUsage();
  }

  // Create coupon usage
  async createCouponUsageService(
    couponUsage: CouponUsageDto,
  ): Promise<CouponUsage> {
    if (!couponUsage) {
      throw new BadRequestException('Not enough data provided');
    }
    const { subtract_points } = couponUsage;
    const coupon = await this.couponAdminService.getCouponsById(
      couponUsage.coupon_id,
    );
    const customer = await this.customerAdminService.getCustomerById(
      couponUsage.customer_id,
    );
    const result = await this.createCouponUsage(coupon, customer, couponUsage);
    if (subtract_points) {
      await this.customerAdminService.updateCustomerPoints(
        couponUsage.customer_id,
        Number(coupon.use_point),
        PointsHistoryType.SUBTRACT,
      );
    }

    return result;
  }

  // Update coupon usage
  async updateCouponUsageService(
    id: string,
    couponUsage: CouponUsageDto,
  ): Promise<CouponUsage> {
    if (!id || !couponUsage) {
      throw new BadRequestException('Not enough data provided');
    }
    const oldCouponUsage = await this.getCouponUsageById(id);
    const { subtract_points } = couponUsage;
    const coupon = await this.couponAdminService.getCouponsById(
      couponUsage.coupon_id,
    );
    const customer = await this.customerAdminService.getCustomerById(
      couponUsage.customer_id,
    );
    if (subtract_points) {
      await this.customerAdminService.updateCustomerPoints(
        customer.id,
        Number(oldCouponUsage.coupon.use_point),
        PointsHistoryType.ADD,
      );
      await this.customerAdminService.updateCustomerPoints(
        customer.id,
        Number(coupon.use_point),
        PointsHistoryType.SUBTRACT,
      );
    }

    return await this.updateCouponUsage(id, couponUsage, coupon, customer);
  }

  // Delete coupon usage
  async deleteCouponUsageService(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getCouponUsageById(id);
    return await this.deleteCouponUsage(id);
  }
}
