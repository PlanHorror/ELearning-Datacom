import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponLabel } from './entity/coupon-label.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/auth/entity/admin.entity';
import { LabelCouponCreateDto } from 'src/common/dtos';

@Injectable()
export class CouponLabelService {
  constructor(
    @InjectRepository(CouponLabel) private couponLabel: Repository<CouponLabel>,
  ) {}

  // Get all labels
  async getLabels(): Promise<CouponLabel[]> {
    return await this.couponLabel.find();
  }

  // Get label by id
  async getLabelById(id: string): Promise<CouponLabel> {
    try {
      const label = await this.couponLabel.findOneBy({ id });
      if (!label) {
        throw new NotFoundException('Label not found');
      }
      return label;
    } catch (error) {
      throw new NotFoundException('Label not found');
    }
  }

  // Get label by name
  async getLabelByName(labelName: string): Promise<CouponLabel> {
    const label = await this.couponLabel.findOneBy({ label: labelName });
    if (!label) {
      throw new NotFoundException('Label not found');
    }
    return label;
  }

  // Create label
  async createLabel(label: LabelCouponCreateDto): Promise<CouponLabel> {
    const newLabel = this.couponLabel.create({
      ...label,
      created_at: new Date(),
      last_updated: new Date(),
    });
    try {
      await this.couponLabel.save(newLabel);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Label already exists')
        : new InternalServerErrorException();
    }
    return newLabel;
  }

  // Update label
  async updateLabel(
    id: string,
    updateLabel: LabelCouponCreateDto,
  ): Promise<CouponLabel> {
    const label = await this.getLabelById(id);
    if (!label) {
      throw new NotFoundException('Label not found');
    }
    const updatedLabel = this.couponLabel.merge(label, updateLabel);
    updatedLabel.last_updated = new Date();
    try {
      await this.couponLabel.save(updatedLabel);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Label already exists')
        : new InternalServerErrorException();
    }
    return updatedLabel;
  }

  // Delete label
  async deleteLabel(id: string): Promise<void> {
    const label = await this.getLabelById(id);
    if (!label) {
      throw new NotFoundException('Label not found');
    }
    await this.couponLabel.remove(label);
  }
}
