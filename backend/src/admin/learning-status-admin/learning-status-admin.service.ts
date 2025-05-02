import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LearningStatus } from './entity/learning-status.entity';
import { Repository } from 'typeorm';
import {
  LearningStatusDto,
  JsonLearningStatusDto,
  FilterLearningStatusDto,
} from 'src/common/dtos/admin';
import {
  convertTimeToSeconds,
  createJsonName,
  saveJson,
} from 'src/common/utils/';
import { CustomerAdminService } from '../customer-admin/customer-admin.service';
import { PointsHistoryAdminService } from '../points-history-admin/points-history-admin.service';
import { PointsHistoryType } from 'src/common/enums';

@Injectable()
export class LearningStatusAdminService {
  constructor(
    @InjectRepository(LearningStatus)
    private learningStatusRepository: Repository<LearningStatus>,
    private customerAdminService: CustomerAdminService,
    private pointsHistoryAdminService: PointsHistoryAdminService,
  ) {}
  /*
   * Raw method
   */
  // Get all learning status
  async getAllLearningStatus(): Promise<LearningStatus[]> {
    return await this.learningStatusRepository.find({
      relations: ['customer'],
    });
  }

  // Get learning status by id
  async getLearningStatusById(id: string): Promise<LearningStatus> {
    try {
      const learningStatus = await this.learningStatusRepository.findOne({
        where: { id: id },
        relations: ['customer'],
      });
      if (!learningStatus) {
        throw new NotFoundException('Learning status not found');
      }
      return learningStatus;
    } catch (error) {
      throw new NotFoundException('Learning status not found');
    }
  }

  // Create a new learning status
  async createLearningStatus(
    data: LearningStatusDto,
    fileName: string,
  ): Promise<LearningStatus> {
    const { time, customerId, changePoints, ...rest } = data;
    const customer =
      await this.customerAdminService.getCustomerById(customerId);
    try {
      const timeInSeconds = convertTimeToSeconds(time);
      const learningStatus = this.learningStatusRepository.create({
        ...rest,
        customer,
        fileName,
        time: timeInSeconds,
      });
      if (changePoints && learningStatus.completion) {
        await this.pointsHistoryAdminService.createPointsHistory(
          {
            customer_id: customer.id,
            type: PointsHistoryType.ADD,
            points: 10000,
            description: `Points added for completed learning lesson ${learningStatus.lessonId}`,
            execute: true,
          },
          customer,
        );
      }
      return await this.learningStatusRepository.save(learningStatus);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error creating learning status');
    }
  }

  async updateLearningStatus(
    data: LearningStatusDto,
    id: string,
  ): Promise<LearningStatus> {
    const oldLearningStatus = await this.getLearningStatusById(id);
    const { time, customerId, changePoints, ...rest } = data;
    const customer =
      await this.customerAdminService.getCustomerById(customerId);
    try {
      const timeInSeconds = convertTimeToSeconds(time);
      if (changePoints) {
        if (oldLearningStatus.completion && !data.completion) {
          await this.pointsHistoryAdminService.createPointsHistory(
            {
              customer_id: customer.id,
              type: PointsHistoryType.SUBTRACT,
              points: 10000,
              description: `Points subtracted for uncompleted learning lesson ${oldLearningStatus.lessonId}`,
              execute: true,
            },
            customer,
          );
        } else if (!oldLearningStatus.completion && data.completion) {
          await this.pointsHistoryAdminService.createPointsHistory(
            {
              customer_id: customer.id,
              type: PointsHistoryType.ADD,
              points: 10000,
              description: `Points added for completed learning lesson ${oldLearningStatus.lessonId}`,
              execute: true,
            },
            customer,
          );
        }
      }
      return await this.learningStatusRepository.save({
        id: id,
        ...rest,
        customer,
        time: timeInSeconds,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error updating learning status');
    }
  }

  // Delete a learning status
  async deleteLearningStatus(id: string): Promise<void> {
    try {
      await this.learningStatusRepository.delete(id);
    } catch (error) {
      throw new BadRequestException('Error deleting learning status');
    }
  }

  /*
   * Service method
   */

  // Filter learning status
  async filterLearningStatus(
    query: FilterLearningStatusDto,
  ): Promise<LearningStatus[]> {
    try {
      return await this.learningStatusRepository.find({
        where: {
          customer: { id: query.customerId },
          lessonId: query.lessonId,
          completion: query.completion,
        },
        relations: ['customer'],
      });
    } catch (error) {
      throw new NotFoundException('Learning status not found');
    }
  }

  // Create learning status from JSON
  async createLearningStatusFromJsonService(
    data: JsonLearningStatusDto,
    file: Express.Multer.File,
  ): Promise<LearningStatus[]> {
    if (!data || !file) {
      throw new BadRequestException('Not enough data provided');
    }
    if (data.learningStatus.length === 0) {
      throw new BadRequestException('No learning status found in JSON');
    }
    const fileName = createJsonName(file);
    const jsonPath = process.env.JSON_LEARNING_STATUS_URL + fileName;
    saveJson(file, jsonPath);
    const listLearningStatus = data.learningStatus;
    const listLearningStatusCreated: LearningStatus[] = [];
    for (const oneLearningStatus of listLearningStatus) {
      listLearningStatusCreated.push(
        await this.createLearningStatus(oneLearningStatus, fileName),
      );
    }
    return listLearningStatusCreated;
  }

  // Create learning status service
  async createLearningStatusService(
    data: LearningStatusDto,
  ): Promise<LearningStatus> {
    if (!data) {
      throw new BadRequestException('Not enough data provided');
    }
    return await this.createLearningStatus(data, '');
  }

  // Udate learning status service
  async updateLearningStatusService(
    data: LearningStatusDto,
    id: string,
  ): Promise<LearningStatus> {
    if (!data || !id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getLearningStatusById(id);

    return await this.updateLearningStatus(data, id);
  }

  // Delete learning status  service
  async deleteLearningStatusService(id: string): Promise<void> {
    if (!id) {
      throw new BadRequestException('Not enough data provided');
    }
    await this.getLearningStatusById(id);
    try {
      await this.deleteLearningStatus(id);
    } catch (error) {
      throw new BadRequestException('Error deleting learning status');
    }
  }
}
