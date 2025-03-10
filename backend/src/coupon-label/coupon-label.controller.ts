import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CouponLabelService } from './coupon-label.service';
import { CouponLabel } from './entity/coupon-label.entity';
import { GetUser, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Admin } from 'src/auth/entity/admin.entity';
import { LabelCouponCreateDto } from 'src/common/dtos';

@Controller('coupon-label')
export class CouponLabelController {
  constructor(private couponLabelService: CouponLabelService) {}

  @Get()
  getLabels() {
    return this.couponLabelService.getLabels();
  }

  @Get('/find')
  async findLabel(
    @Query('name') name?: string,
    @Query('id') id?: string,
  ): Promise<CouponLabel | CouponLabel[]> {
    if (name && id) {
      throw new Error('Provide only one query parameter');
    } else if (name) {
      return await this.couponLabelService.getLabelByName(name);
    } else if (id) {
      return await this.couponLabelService.getLabelById(id);
    } else {
      return await this.couponLabelService.getLabels();
    }
  }

  @Post()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  createLabel(@Body() label: LabelCouponCreateDto): Promise<CouponLabel> {
    return this.couponLabelService.createLabel(label);
  }

  @Patch('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  updateLabel(
    @Param('id') id: string,
    @Body() label: LabelCouponCreateDto,
  ): Promise<CouponLabel> {
    return this.couponLabelService.updateLabel(id, label);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteLabel(@Param('id') id: string): Promise<void> {
    return this.couponLabelService.deleteLabel(id);
  }
}
