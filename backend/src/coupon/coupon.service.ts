import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entity/coupon.entity';
import { CouponLabel } from '../coupon-label/entity/coupon-label.entity';
import { Repository } from 'typeorm';
import { CouponDto } from 'src/common/dtos';
import { Company } from 'src/auth/entity/company.entity';
import { Express } from 'express';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { CouponLabelService } from 'src/coupon-label/coupon-label.service';
@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private coupon: Repository<Coupon>,
    private labelService: CouponLabelService,
  ) {}

  // Get all coupons
  async getCoupons(): Promise<Coupon[]> {
    return await this.coupon.find();
  }

  // Get coupon by id
  async getCouponById(id: string): Promise<Coupon> {
    const coupon = await this.coupon.findOneBy({ id });
    if (!coupon) {
      throw new Error('Coupon not found');
    }
    return coupon;
  }

  // Create coupon
  // async createCoupon(
  //   company: Company,
  //   couponDto: CouponDto,
  //   image: Express.Multer.File,
  // ): Promise<Coupon> {
  //   const newCoupon = this.coupon.create({
  //     ...couponDto,
  //     company,
  //     created_at: new Date(),
  //     last_updated: new Date(),
  //   });
  //   const label = await this.labelService.getLabelByName(couponDto.label);
  //   const imageFilename = this.saveCouponImage(image);
  //   newCoupon.image = imageFilename;
  //   try {
  //     await this.coupon.save(newCoupon);
  //     const filePath = process.env.COUPON_IMAGE_URL + imageFilename;
  //     fs.writeFile(filePath, image.buffer, (err) => {
  //       if (err) {
  //         throw new InternalServerErrorException();
  //       }
  //     });
  //   } catch (error) {
  //     throw error.code === '23505'
  //       ? new ConflictException('Coupon code exists')
  //       : new InternalServerErrorException();
  //   }
  //   return newCoupon;
  // }

  // Update coupon
  async updateCoupon(
    company: Company,
    id: string,
    updateCoupon: CouponDto,
  ): Promise<Coupon> {
    const { label, ...newCouponInfo } = updateCoupon;
    const coupon = await this.getCouponById(id);
    if (!coupon) {
      throw new Error('Coupon not found');
    }
    if (coupon.company.id !== company.id) {
      throw new MethodNotAllowedException(
        'You are not allowed to update this coupon',
      );
    }
    const updatedCoupon = this.coupon.merge(coupon, newCouponInfo);
    if (label) {
      const labelEntity = await this.labelService.getLabelByName(label);
      updatedCoupon.label = labelEntity;
    }
    updatedCoupon.last_updated = new Date();
    try {
      await this.coupon.save(updatedCoupon);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Coupon already exists')
        : new InternalServerErrorException();
    }
    return updatedCoupon;
  }

  // Delete coupon
  async deleteCoupon(id: string, company: Company): Promise<void> {
    const coupon = await this.getCouponById(id);
    if (!coupon) {
      throw new Error('Coupon not found');
    }
    if (coupon.company.id !== company.id) {
      throw new MethodNotAllowedException(
        'You are not allowed to delete this coupon',
      );
    } else {
      await this.coupon.remove(coupon);
    }
  }

  // Save coupon image
  saveCouponImage(image: Express.Multer.File): string {
    const ext = path.extname(image.originalname);
    const name = path.basename(image.originalname, ext);
    const filename = `${name}-${uuidv4()}${ext}`;

    return filename;
  }
}
