import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponFavourite } from './entity/coupon-favourite.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entity/customer.entity';
import { CouponService } from 'src/coupon/coupon.service';

@Injectable()
export class CouponFavouriteService {
  constructor(
    @InjectRepository(CouponFavourite)
    private couponFavouriteRepository: Repository<CouponFavourite>,
    private couponService: CouponService,
  ) {}

  // Get coupon favourite by id
  async getCouponFavouriteById(id: string): Promise<CouponFavourite> {
    let couponFavourite;
    try {
      couponFavourite = await this.couponFavouriteRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Coupon favourite not found');
    }
    if (!couponFavourite) {
      throw new NotFoundException('Coupon favourite not found');
    }
    return couponFavourite;
  }

  // Get coupon favourites by customer
  async getCouponFavouritesByCustomer(
    customer: Customer,
  ): Promise<CouponFavourite[]> {
    return await this.couponFavouriteRepository.find({
      where: {
        customer: {
          id: customer.id,
        },
      },
    });
  }

  // Create coupon favourite
  async createCouponFavourite(
    customer: Customer,
    couponId: string,
  ): Promise<CouponFavourite> {
    const coupon = await this.couponService.getCouponById(couponId);
    if (!this.couponService.validateCoupon(coupon)) {
      await this.couponService.setCouponStatus(coupon);
      throw new NotFoundException('Coupon invalid');
    }
    const newCouponFavourite = this.couponFavouriteRepository.create({
      customer,
      coupon,
    });
    try {
      await this.couponFavouriteRepository.save(newCouponFavourite);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Coupon already favourited')
        : new InternalServerErrorException();
    }
    return newCouponFavourite;
  }

  // Delete coupon favourite
  async deleteCouponFavourite(
    customer: Customer,
    couponFavouriteId: string,
  ): Promise<void> {
    const couponFavourite =
      await this.getCouponFavouriteById(couponFavouriteId);
    if (couponFavourite.customer.id !== customer.id) {
      throw new NotFoundException('Coupon favourite not found');
    }
    await this.couponFavouriteRepository.remove(couponFavourite);
  }
}
