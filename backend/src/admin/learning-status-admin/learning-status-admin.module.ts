import { Module } from '@nestjs/common';
import { LearningStatusAdminController } from './learning-status-admin.controller';
import { LearningStatusAdminService } from './learning-status-admin.service';

@Module({
  controllers: [LearningStatusAdminController],
  providers: [LearningStatusAdminService]
})
export class LearningStatusAdminModule {}
