import { Module } from '@nestjs/common';
import { PointsHistoryAdminController } from './points-history-admin.controller';
import { PointsHistoryAdminService } from './points-history-admin.service';

@Module({
  controllers: [PointsHistoryAdminController],
  providers: [PointsHistoryAdminService]
})
export class PointsHistoryAdminModule {}
