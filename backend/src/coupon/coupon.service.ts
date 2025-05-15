import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entity/coupon.entity';
import { Repository } from 'typeorm';
import { CouponDto } from 'src/common/dtos';
import { Company } from 'src/company/entity/company.entity';
import { Express } from 'express';
import type { Multer } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import { CouponLabelService } from 'src/coupon/coupon-label/coupon-label.service';
import { CouponStatus } from 'src/common/enums';
import { CouponUpdateDto } from 'src/common/dtos/coupon_update.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
import { FilterCouponDto } from 'src/common/dtos/admin/filter-coupon.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(Coupon) private coupon: Repository<Coupon>,
    private labelService: CouponLabelService,
    private cloudinaryService: CloudinaryService,
  ) {}

  // Get all coupons
  async getCoupons(): Promise<Coupon[]> {
    return await this.coupon.find();
  }

  // Get coupons by filter from the database
  async getCouponsByFilterService(filter?: FilterCouponDto): Promise<Coupon[]> {
    if (!filter) {
      return await this.getCoupons();
    }
    return await this.coupon.find({
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

  // Get coupon by id
  async getCouponById(id: string): Promise<Coupon> {
    if (!id) {
      throw new NotFoundException('Coupon not found');
    }
    let coupon;
    try {
      coupon = await this.coupon.findOne({ where: { id: id } });
      await this.setCouponStatus(coupon);
    } catch (error) {
      throw new NotFoundException('Coupon not found');
    }
    if (!coupon) {
      throw new NotFoundException('Coupon not found');
    }
    return coupon;
  }

  // Get coupons by company
  async getCouponsByCompany(company: Company): Promise<Coupon[]> {
    return await this.coupon.find({ where: { company } });
  }

  // Create coupon
  async createCoupon(
    company: Company,
    couponDto: CouponDto,
    image: Express.Multer.File,
  ): Promise<Coupon> {
    const { label, ...newCouponInfo } = couponDto;
    const labelEntity = await this.labelService.getLabelByName(label);
    const uploadedImage = await this.cloudinaryService.uploadFile(image);
    const newCoupon = this.coupon.create({
      ...newCouponInfo,
      company,
      label: labelEntity,
      image: uploadedImage.secure_url,
      // image: this.saveCouponImage(image),
    });
    try {
      await this.coupon.save(newCoupon);
      // const imagePath = process.env.COUPON_IMAGE_URL || 'uploads/coupons/';
      // const uploadDir = path.join(process.cwd(), imagePath);
      // console.log('Check imagePath in service: ', imagePath);
      // console.log('Check uploadDir in service: ', uploadDir);
      // // Ensure directory exists
      // if (!fs.existsSync(uploadDir)) {
      //   fs.mkdirSync(uploadDir, { recursive: true });
      // }

      // const filePath = path.join(uploadDir, newCoupon.image);
      // console.log('Check filePath in service: ', filePath);
      // try {
      //   await fs.promises.writeFile(filePath, image.buffer);
      // } catch (error) {
      //   console.error('Error writing file:', error);
      //   throw new InternalServerErrorException('Failed to save image');
      // }
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Coupon code already exists')
        : new InternalServerErrorException();
    }
    return newCoupon;
  }

  // Update coupon
  async updateCoupon(
    company: Company,
    id: string,
    updateCoupon: CouponUpdateDto,
    image?: Express.Multer.File,
  ): Promise<Coupon> {
    const { label, ...newCouponInfo } = updateCoupon;
    const coupon = await this.getCouponById(id);
    if (!coupon) {
      throw new Error('Coupon not found');
    }
    const oldImage = coupon.image;
    if (coupon.company.id !== company.id) {
      throw new MethodNotAllowedException(
        'You are not allowed to update this coupon',
      );
    }
    const updatedCoupon = this.coupon.merge(coupon, newCouponInfo);
    updatedCoupon.status = this.getCouponStatus(updatedCoupon.period_start);
    if (label) {
      const labelEntity = await this.labelService.getLabelByName(label);
      updatedCoupon.label = labelEntity;
    }
    try {
      await this.coupon.save(updatedCoupon);
      if (image) {
        const imageFilename = this.saveCouponImage(image);
        updatedCoupon.image = imageFilename;
        const imagePath = process.env.COUPON_IMAGE_URL || 'uploads/coupons/';
        const filePath = path.join(process.cwd(), imagePath, imageFilename);
        fs.writeFile(filePath, image.buffer, (err) => {
          if (err) {
            throw new InternalServerErrorException();
          }
        });
        const oldImagePath = path.join(process.cwd(), imagePath, oldImage);
        fs.unlink(oldImagePath, (err) => {
          if (err) {
            throw new InternalServerErrorException();
          }
        });
      }
      await this.coupon.save(updatedCoupon);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Coupon code already exists')
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
      try {
        const imagePath = process.env.COUPON_IMAGE_URL || 'uploads/coupons/';
        const filePath = path.join(process.cwd(), imagePath, coupon.image);
        fs.unlink(filePath, (err) => {
          if (err) {
            throw new InternalServerErrorException();
          }
        });
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }
  // Save coupon image
  saveCouponImage(image: Express.Multer.File): string {
    const ext = path.extname(image.originalname);
    const name = path.basename(image.originalname, ext);
    const filename = `${name}-${uuidv4()}${ext}`;
    return filename;
  }

  // Validate coupon
  validateCoupon(coupon: Coupon): boolean {
    if (
      coupon.status === CouponStatus.EXPIRED ||
      coupon.status === CouponStatus.CLAIMED ||
      coupon.period_end < new Date()
    ) {
      return false;
    }
    return true;
  }

  // Get coupon status
  getCouponStatus(period_end: Date): CouponStatus {
    const currentDate = new Date();
    if (currentDate <= period_end) {
      return CouponStatus.ACTIVE;
    } else {
      return CouponStatus.EXPIRED;
    }
  }

  // Set coupon status
  async setCouponStatus(coupon: Coupon): Promise<Coupon> {
    if (
      coupon.status === CouponStatus.EXPIRED ||
      coupon.status === CouponStatus.CLAIMED
    ) {
      return coupon;
    }
    coupon.status = this.getCouponStatus(coupon.period_end);
    return await this.coupon.save(coupon);
  }

  @Cron(CronExpression.EVERY_9_HOURS)
  async changeCouponStatus() {
    try {
      const coupons = await this.coupon.find();
      for (const coupon of coupons) {
        if (coupon.status === CouponStatus.ACTIVE) {
          await this.setCouponStatus(coupon);
        }
      }
    } catch (error) {
      console.error('Error changing coupon status:', error);
    }
  }
}
