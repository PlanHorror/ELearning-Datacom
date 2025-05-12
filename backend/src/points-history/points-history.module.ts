import { Module } from '@nestjs/common';
import { PointsHistoryService } from './points-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointsHistory } from './entity/points-history.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PointsHistoryController } from './points-history.controller';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PointsHistory]),
    AuthModule,
    CustomerModule,
  ],
  providers: [PointsHistoryService],
  exports: [PointsHistoryService],
  controllers: [PointsHistoryController],
})
export class PointsHistoryModule {}
