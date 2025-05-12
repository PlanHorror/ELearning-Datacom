import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointsHistory } from './entity/points-history.entity';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entity/customer.entity';
import { CouponHistoryDto } from 'src/common/dtos/coupon-history.dto';
import { AuthService } from 'src/auth/auth.service';
import { PointsHistoryType } from 'src/common/enums';

@Injectable()
export class PointsHistoryService {
  constructor(
    @InjectRepository(PointsHistory)
    private couponHistoryRepository: Repository<PointsHistory>,
    private authService: AuthService,
  ) {}

  // Get all points history
  async getPointsHistory(): Promise<PointsHistory[]> {
    return await this.couponHistoryRepository.find();
  }

  // Get points history by id
  async getPointsHistoryById(id: string): Promise<PointsHistory> {
    if (!id) {
      throw new NotFoundException('Points history not found');
    }
    let pointsHistory;
    try {
      pointsHistory = await this.couponHistoryRepository.findOne({
        where: { id: id },
      });
    } catch (error) {
      throw new NotFoundException('Points history not found');
    }
    if (!pointsHistory) {
      throw new NotFoundException('Points history not found');
    }
    return pointsHistory;
  }

  // Get points history by customer
  async getPointsHistoryByCustomer(
    customer: Customer,
  ): Promise<PointsHistory[]> {
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }
    return await this.couponHistoryRepository.find({
      where: { customer: { id: customer.id } },
    });
  }

  // Create points history
  async createPointsHistory(
    customer: Customer,
    points: number,
    description: string,
    type: PointsHistoryType,
  ): Promise<PointsHistory> {
    const newPointsHistory = this.couponHistoryRepository.create({
      points,
      description,
      customer,
      type,
    });
    await this.couponHistoryRepository.save(newPointsHistory);
    return newPointsHistory;
  }

  // Delete points history
  async deletePointsHistory(id: string): Promise<void> {
    if (!id) {
      throw new NotFoundException('Points history not found');
    }
    try {
      await this.couponHistoryRepository.delete({ id });
    } catch (error) {
      throw new NotFoundException('Points history not found');
    }
  }
}
