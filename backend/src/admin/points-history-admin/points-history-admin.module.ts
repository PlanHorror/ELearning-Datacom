import { Module } from '@nestjs/common';
import { PointsHistoryAdminController } from './points-history-admin.controller';
import { PointsHistoryAdminService } from './points-history-admin.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsHistory } from 'src/points-history/entity/points-history.entity';
import { CustomerAdminModule } from '../customer-admin/customer-admin.module';

@Module({
  controllers: [PointsHistoryAdminController],
  providers: [PointsHistoryAdminService],
  exports: [PointsHistoryAdminService],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([PointsHistory]),
    CustomerAdminModule,
  ],
})
export class PointsHistoryAdminModule {}
