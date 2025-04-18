import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponDto, FilterCouponDto } from 'src/common/dtos/admin';
import { createImageName, removeImage, saveImage } from 'src/common/utils';
import { Coupon } from 'src/coupon/entity/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private couponRepository: Repository<Coupon>,
  ) {}

  /*
   * Raw methods
   */
  // Get all coupons from the database
  async getAllCoupons(): Promise<Coupon[]> {
    return await this.couponRepository.find({
      relations: ['company', 'label', 'coupon_usage'],
    });
  }

  async getCouponsById(id: string): Promise<Coupon> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.couponRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new BadRequestException('Coupon not found');
    }
  }

  // Create a new coupon in the database
  async createCoupon(coupon: CouponDto, imageName: string): Promise<Coupon> {
    try {
      return await this.couponRepository.save({
        ...coupon,
        image: imageName,
      });
    } catch (error) {
      throw new BadRequestException('Error when creating coupon');
    }
  }

  // Update an existing coupon in the database
  async updateCoupon(
    coupon: CouponDto,
    id: string,
    imageName?: string,
  ): Promise<Coupon> {
    try {
      if (imageName) {
        return await this.couponRepository.save({
          ...coupon,
          id: id,
          image: imageName,
        });
      }
      return await this.couponRepository.save({
        ...coupon,
        id: id,
      });
    } catch (error) {
      throw new BadRequestException('Error when updating coupon');
    }
  }

  // Delete a coupon from the database
  async deleteCoupon(id: string): Promise<void> {
    try {
      await this.couponRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Error when deleting coupon');
    }
  }

  /*
   * Service methods
   */

  // Get all coupons or a coupon by id from the database
  async getCouponsService(id?: string): Promise<Coupon[] | Coupon> {
    if (id) {
      return await this.getCouponsById(id);
    } else {
      return await this.getAllCoupons();
    }
  }

  // Get coupons by filter from the database
  async getCouponsByFilterService(filter?: FilterCouponDto): Promise<Coupon[]> {
    if (!filter) {
      return await this.getAllCoupons();
    }
    return await this.couponRepository.find({
      relations: ['company', 'label'],
      where: {
        company: { id: filter.companyId },
        label: { id: filter.labelId },
        status: filter.status,
        title: filter.title,
        use_code: filter.useCode,
      },
    });
  }

  // Create a new coupon in the database
  async createCouponService(couponData: CouponDto, image: Express.Multer.File) {
    if (!couponData || !image) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const couponImageName = createImageName(image);
      const coupon = await this.createCoupon(couponData, couponImageName);
      saveImage(image, process.env.COUPON_IMAGE_URL + couponImageName);
      return coupon;
    } catch (error) {
      throw new BadRequestException('Error when creating coupon');
    }
  }

  // Update an existing coupon in the database
  async updateCouponService(
    couponData: CouponDto,
    id: string,
    image?: Express.Multer.File,
  ) {
    if (!couponData || !id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getCouponsById(id);
    try {
      if (image) {
        const oldCoupon = await this.getCouponsById(id);
        const couponImageName = createImageName(image);
        const coupon = await this.updateCoupon(couponData, id, couponImageName);
        removeImage(process.env.COUPON_IMAGE_URL + oldCoupon.image);
        saveImage(image, process.env.COUPON_IMAGE_URL + couponImageName);
        return coupon;
      } else {
        return await this.updateCoupon(couponData, id);
      }
    } catch (error) {
      throw new BadRequestException('Error when updating coupon');
    }
  }

  // Delete a coupon from the database
  async deleteCouponService(id: string) {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const coupon = await this.getCouponsById(id);
      removeImage(process.env.COUPON_IMAGE_URL + coupon.image);
      await this.deleteCoupon(id);
    } catch (error) {
      throw new BadRequestException('Error when deleting coupon');
    }
  }
}
