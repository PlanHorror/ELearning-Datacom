import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PointsHistoryAdminService } from './points-history-admin.service';
import { ApiQuery } from '@nestjs/swagger';
import { PointsHistory } from 'src/points-history/entity/points-history.entity';
import { PointsHistoryDto } from 'src/common/dtos/admin';

@Controller('admin/points-history')
export class PointsHistoryAdminController {
  constructor(private pointsHistoryAdminService: PointsHistoryAdminService) {}

  @Get()
  @ApiQuery({
    name: 'customerId',
    required: false,
    description: 'Filter by customer ID',
  })
  @ApiQuery({
    name: 'historyId',
    required: false,
    description: 'Filter by history ID',
  })
  async getAllPointsHistory(
    @Query('customerId') customerId?: string,
    @Query('historyId') historyId?: string,
  ): Promise<PointsHistory[] | PointsHistory> {
    return await this.pointsHistoryAdminService.getPointsHistorySevice(
      customerId,
      historyId,
    );
  }

  @Post()
  async createPointsHistory(
    @Body() pointsHistoryDto: PointsHistoryDto,
  ): Promise<PointsHistory> {
    return await this.pointsHistoryAdminService.createPointsHistoryService(
      pointsHistoryDto,
    );
  }

  @Patch('/:id')
  async updatePointsHistory(
    @Param('id') id: string,
    @Body() pointsHistoryDto: PointsHistoryDto,
  ): Promise<PointsHistory> {
    return await this.pointsHistoryAdminService.updatePointsHistoryService(
      id,
      pointsHistoryDto,
    );
  }

  @Delete('/:id')
  async deletePointsHistory(@Param('id') id: string): Promise<void> {
    return await this.pointsHistoryAdminService.deletePointsHistoryService(id);
  }
}
