import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponFavourite } from 'src/coupon/coupon-favourite/entity/coupon-favourite.entity';
import { Repository } from 'typeorm';
import { CouponAdminService } from '../coupon-admin/coupon-admin.service';
import { CustomerAdminService } from '../customer-admin/customer-admin.service';
import {
  CouponFavouriteDto,
  FilterCouponFavouriteDto,
} from 'src/common/dtos/admin';
import { Coupon } from 'src/coupon/entity/coupon.entity';
import { Customer } from 'src/customer/entity/customer.entity';

@Injectable()
export class CouponFavouriteAdminService {
  constructor(
    @InjectRepository(CouponFavourite)
    private couponFavouriteRepository: Repository<CouponFavourite>,
    private couponAdminService: CouponAdminService,
    private customerAdminService: CustomerAdminService,
  ) {}

  /*
   * Raw methods
   */
  // Get all coupon favourites from the database
  async getAllCouponFavourites(): Promise<CouponFavourite[]> {
    return await this.couponFavouriteRepository.find({
      relations: ['customer', 'coupon'],
    });
  }

  // Get a coupon favourite by id from the database
  async getCouponFavouriteById(id: string): Promise<CouponFavourite> {
    console.log('id', id);
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.couponFavouriteRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException('Coupon favourite not found');
    }
  }

  // Get a coupon favourite by customer id from the database
  async getCouponFavouriteByCustomerId(
    customer_id: string,
  ): Promise<CouponFavourite[]> {
    if (!customer_id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.couponFavouriteRepository.find({
        where: { customer: { id: customer_id } },
        relations: ['customer', 'coupon'],
      });
    } catch (error) {
      throw new NotFoundException('Coupon favourite not found');
    }
  }

  // Get a coupon favourite by coupon id from the database
  async getCouponFavouriteByCouponId(
    coupon_id: string,
  ): Promise<CouponFavourite[]> {
    if (!coupon_id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.couponFavouriteRepository.find({
        where: { coupon: { id: coupon_id } },
        relations: ['customer', 'coupon'],
      });
    } catch (error) {
      throw new NotFoundException('Coupon favourite not found');
    }
  }

  // Create a new coupon favourite in the database
  async createCouponFavourite(
    coupon: Coupon,
    customer: Customer,
    couponFavourite: CouponFavouriteDto,
  ): Promise<CouponFavourite> {
    const { customer_id, coupon_id, ...data } = couponFavourite;
    try {
      return await this.couponFavouriteRepository.save({
        customer: customer,
        coupon: coupon,
        ...data,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Coupon favourite already exists');
      }
      throw new BadRequestException('Error when creating coupon favourite');
    }
  }

  // Update an existing coupon favourite in the database
  async updateCouponFavourite(
    couponFavourite: CouponFavouriteDto,
    id: string,
    coupon: Coupon,
    customer: Customer,
  ): Promise<CouponFavourite> {
    try {
      const { customer_id, coupon_id, ...data } = couponFavourite;
      return await this.couponFavouriteRepository.save({
        ...data,
        customer: customer,
        coupon: coupon,
        id: id,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Coupon favourite already exists');
      }
      throw new BadRequestException('Error when updating coupon favourite');
    }
  }

  // Delete a coupon favourite from the database
  async deleteCouponFavourite(id: string): Promise<void> {
    try {
      await this.couponFavouriteRepository.delete(id);
    } catch (error) {
      throw new NotFoundException('Coupon favourite not found');
    }
  }

  /*
   * Service methods
   */

  // Get a coupon favourite by customer id and coupon id from the database
  async filterCouponFavouriteService(
    filter: FilterCouponFavouriteDto,
  ): Promise<CouponFavourite[]> {
    try {
      return await this.couponFavouriteRepository.find({
        where: {
          customer: { id: filter.customer_id ? filter.customer_id : undefined },
          coupon: { id: filter.coupon_id ? filter.coupon_id : undefined },
        },
        relations: ['customer', 'coupon'],
      });
    } catch (error) {
      throw new NotFoundException('Coupon favourite not found');
    }
  }

  // Create a new coupon favourite in the database
  async createCouponFavouriteService(
    couponFavourite: CouponFavouriteDto,
  ): Promise<CouponFavourite> {
    const { customer_id, coupon_id, ...data } = couponFavourite;
    const customer =
      await this.customerAdminService.getCustomerById(customer_id);
    const coupon = await this.couponAdminService.getCouponsById(coupon_id);
    return await this.createCouponFavourite(coupon, customer, couponFavourite);
  }

  // Update an existing coupon favourite in the database
  async updateCouponFavouriteService(
    couponFavourite: CouponFavouriteDto,
    id: string,
  ): Promise<CouponFavourite> {
    if (!id || !couponFavourite) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getCouponFavouriteById(id);
    const { customer_id, coupon_id, ...data } = couponFavourite;
    const customer =
      await this.customerAdminService.getCustomerById(customer_id);
    const coupon = await this.couponAdminService.getCouponsById(coupon_id);
    return await this.updateCouponFavourite(
      couponFavourite,
      id,
      coupon,
      customer,
    );
  }

  // Delete a coupon favourite from the database
  async deleteCouponFavouriteService(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getCouponFavouriteById(id);
    return await this.deleteCouponFavourite(id);
  }
}
