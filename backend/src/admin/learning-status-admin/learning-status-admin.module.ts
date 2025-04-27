import { Module } from '@nestjs/common';
import { LearningStatusAdminController } from './learning-status-admin.controller';
import { LearningStatusAdminService } from './learning-status-admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningStatus } from './entity/learning-status.entity';
import { CustomerAdminModule } from '../customer-admin/customer-admin.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LearningStatusAdminController],
  providers: [LearningStatusAdminService],
  imports: [
    TypeOrmModule.forFeature([LearningStatus]),
    CustomerAdminModule,
    AuthModule,
  ],
})
export class LearningStatusAdminModule {}
