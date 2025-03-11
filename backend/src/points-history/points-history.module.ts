import { Module } from '@nestjs/common';
import { PointsHistoryController } from './points-history.controller';
import { PointsHistoryService } from './points-history.service';

@Module({
  controllers: [PointsHistoryController],
  providers: [PointsHistoryService]
})
export class PointsHistoryModule {}
