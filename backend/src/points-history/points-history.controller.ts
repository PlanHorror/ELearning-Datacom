import { Controller, Get, UseGuards } from '@nestjs/common';
import { PointsHistoryService } from './points-history.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { PointsHistory } from './entity/points-history.entity';
import { Customer } from 'src/auth/entity/customer.entity';

@Controller('points-history')
export class PointsHistoryController {
  constructor(private pointsHistoryService: PointsHistoryService) {}

  @Get()
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async getPointsHistory(
    @GetUser() customer: Customer,
  ): Promise<PointsHistory[]> {
    return this.pointsHistoryService.getPointsHistoryByCustomer(customer);
  }
}
