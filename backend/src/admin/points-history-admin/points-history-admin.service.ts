import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PointsHistory } from 'src/points-history/entity/points-history.entity';
import { Repository } from 'typeorm';
import { CustomerAdminService } from '../customer-admin/customer-admin.service';
import { PointsHistoryDto } from 'src/common/dtos/admin';
import { Customer } from 'src/customer/entity/customer.entity';

@Injectable()
export class PointsHistoryAdminService {
  constructor(
    @InjectRepository(PointsHistory)
    private pointsHistoryRepositoy: Repository<PointsHistory>,
    private customerAdminService: CustomerAdminService,
  ) {}

  /*
   * Raw methods
   */
  // Get all points history records
  async getAllPointsHistory(): Promise<PointsHistory[]> {
    return await this.pointsHistoryRepositoy.find({
      relations: ['customer'],
    });
  }

  // Get points history by ID
  async getPointsHistoryById(id: string): Promise<PointsHistory> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      return await this.pointsHistoryRepositoy.findOneByOrFail({
        id,
      });
    } catch (error) {
      throw new BadRequestException('Points history not found');
    }
  }

  // Get points history by customer ID
  async getPointsHistoryByCustomerId(
    customerId: string,
  ): Promise<PointsHistory[]> {
    if (!customerId) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const customer =
        await this.customerAdminService.getCustomerById(customerId);
      return await this.pointsHistoryRepositoy.find({
        where: { customer },
        relations: ['customer'],
      });
    } catch (error) {
      throw new BadRequestException('Customer not found');
    }
  }

  // Create points history record
  async createPointsHistory(
    pointsHistory: PointsHistoryDto,
    customer: Customer,
  ): Promise<PointsHistory> {
    if (!pointsHistory) {
      throw new BadRequestException('Not enough data provided');
    }
    try {
      const { customer_id, execute, ...rest } = pointsHistory;
      if (execute)
        await this.customerAdminService.updateCustomerPoints(
          customer.id,
          rest.points,
          rest.type,
        );
      return await this.pointsHistoryRepositoy.save(
        this.pointsHistoryRepositoy.create({
          ...rest,
          customer,
        }),
      );
    } catch (error) {
      throw new BadRequestException('Error creating points history record');
    }
  }

  // Update points history record
  async updatePointsHistory(
    id: string,
    pointsHistory: PointsHistoryDto,
    customer: Customer,
  ): Promise<PointsHistory> {
    try {
      const { customer_id, execute, ...rest } = pointsHistory;
      const oldPointsHistory = await this.getPointsHistoryById(id);
      if (execute) {
        if (oldPointsHistory.type !== rest.type) {
          await this.customerAdminService.updateCustomerPoints(
            customer.id,
            Number(oldPointsHistory.points) + Number(rest.points),
            rest.type,
          );
        } else {
          await this.customerAdminService.updateCustomerPoints(
            customer.id,
            Number(rest.points) - Number(oldPointsHistory.points),
            rest.type,
          );
        }
      }
      return await this.pointsHistoryRepositoy.save({
        id,
        ...rest,
        customer,
      });
    } catch (error) {
      throw new BadRequestException('Error updating points history record');
    }
  }

  // Delete points history record
  async deletePointsHistory(id: string): Promise<void> {
    try {
      await this.pointsHistoryRepositoy.delete(id);
    } catch (error) {
      throw new BadRequestException('Error deleting points history record');
    }
  }

  /*
   * Service methods
   */

  // Get points history by customer ID and coupon ID
  async getPointsHistorySevice(
    customerId?: string,
    historyId?: string,
  ): Promise<PointsHistory[] | PointsHistory> {
    if (customerId && historyId) {
      throw new BadRequestException(
        'Please provide either customerId or couponId, not both',
      );
    } else if (customerId) {
      return await this.getPointsHistoryByCustomerId(customerId);
    } else if (historyId) {
      return await this.getPointsHistoryById(historyId);
    } else {
      return await this.getAllPointsHistory();
    }
  }

  // Create points history record
  async createPointsHistoryService(
    pointsHistory: PointsHistoryDto,
  ): Promise<PointsHistory> {
    if (!pointsHistory) {
      throw new BadRequestException('Not enough data provided');
    }
    const customer = await this.customerAdminService.getCustomerById(
      pointsHistory.customer_id,
    );
    return await this.createPointsHistory(pointsHistory, customer);
  }

  // Update points history record
  async updatePointsHistoryService(
    id: string,
    pointsHistory: PointsHistoryDto,
  ): Promise<PointsHistory> {
    if (!id || !pointsHistory) {
      throw new BadRequestException('Not enough data provided');
    }
    const customer = await this.customerAdminService.getCustomerById(
      pointsHistory.customer_id,
    );
    await this.getPointsHistoryById(id);
    return await this.updatePointsHistory(id, pointsHistory, customer);
  }

  // Delete points history record
  async deletePointsHistoryService(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getPointsHistoryById(id);
    return await this.deletePointsHistory(id);
  }
}
