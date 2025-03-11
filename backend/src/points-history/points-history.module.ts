import { Module } from '@nestjs/common';
import { PointsHistoryService } from './points-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsHistory } from './entity/points-history.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PointsHistoryController } from './points-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PointsHistory]), AuthModule],
  providers: [PointsHistoryService],
  exports: [PointsHistoryService],
  controllers: [PointsHistoryController],
})
export class PointsHistoryModule {}
