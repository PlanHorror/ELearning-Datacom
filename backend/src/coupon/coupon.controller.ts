import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CouponService } from './coupon.service';
import { CouponDto } from 'src/common/dtos';
import { CouponImageOption } from 'src/common/interceptors';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { Company } from 'src/auth/entity/company.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';

@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Post()
  @Roles(Role.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FileInterceptor('image', CouponImageOption))
  createCoupon(
    @Body() couponDto: CouponDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: Company,
  ) {
    if (!file) {
      throw new ForbiddenException('Image is required');
    }
    // return this.couponService.createCoupon(user, couponDto, file);
  }
}
