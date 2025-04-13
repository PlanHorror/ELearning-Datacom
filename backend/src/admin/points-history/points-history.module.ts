import { Module } from '@nestjs/common';
import { PointsHistoryService } from './points-history.service';
import { PointsHistoryController } from './points-history.controller';

@Module({
  providers: [PointsHistoryService],
  controllers: [PointsHistoryController]
})
export class PointsHistoryModule {}
