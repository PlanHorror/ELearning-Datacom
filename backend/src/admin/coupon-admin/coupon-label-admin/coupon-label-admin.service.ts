import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponLabelDto } from 'src/common/dtos/admin';
import { CouponLabel } from 'src/coupon/coupon-label/entity/coupon-label.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponLabelAdminService {
  constructor(
    @InjectRepository(CouponLabel)
    private couponLabelRepository: Repository<CouponLabel>,
  ) {}

  /*
   * Raw methods
   */
  // Get all coupon labels from the database
  async getAllCouponLabels(): Promise<CouponLabel[]> {
    return await this.couponLabelRepository.find();
  }

  // Get a coupon label by id from the database
  async getCouponLabelById(id: string): Promise<CouponLabel> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.couponLabelRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException('Coupon label not found');
    }
  }

  // Get a coupon label by label from the database
  async getCouponLabelByLabel(label: string): Promise<CouponLabel> {
    if (!label) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.couponLabelRepository.findOneByOrFail({ label });
    } catch (error) {
      throw new NotFoundException('Coupon label not found');
    }
  }

  // Create a new coupon label in the database
  async createCouponLabel(data: CouponLabelDto): Promise<CouponLabel> {
    try {
      const couponLabel = this.couponLabelRepository.create(data);
      return await this.couponLabelRepository.save(couponLabel);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Coupon label already exists');
      }
      console.error(error);
      throw new BadRequestException('Error creating coupon label');
    }
  }

  // Update a coupon label in the database
  async updateCouponLabel(
    id: string,
    data: CouponLabelDto,
  ): Promise<CouponLabel> {
    try {
      return await this.couponLabelRepository.save({
        ...data,
        id,
      });
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Coupon label already exists');
      }
      throw new BadRequestException('Error updating coupon label');
    }
  }

  // Delete a coupon label in the database
  async deleteCouponLabel(id: string): Promise<void> {
    try {
      await this.couponLabelRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Error deleting coupon label');
    }
  }

  /*
   * Service methods
   */
  //  Get coupon labels from the database
  async getCouponLabelService(
    id?: string,
    label?: string,
  ): Promise<CouponLabel[] | CouponLabel> {
    if (id && label) {
      throw new BadRequestException('Please provide only one parameter');
    }
    if (id) {
      return await this.getCouponLabelById(id);
    } else if (label) {
      return await this.getCouponLabelByLabel(label);
    } else {
      return await this.getAllCouponLabels();
    }
  }

  // Create a coupon label in the database
  async createCouponLabelService(data: CouponLabelDto): Promise<CouponLabel> {
    return await this.createCouponLabel(data);
  }

  // Update a coupon label in the database
  async updateCouponLabelService(
    id: string,
    data: CouponLabelDto,
  ): Promise<CouponLabel> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getCouponLabelById(id);
    return await this.updateCouponLabel(id, data);
  }

  // Delete a coupon label in the database
  async deleteCouponLabelService(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getCouponLabelById(id);
    return await this.deleteCouponLabel(id);
  }
}
