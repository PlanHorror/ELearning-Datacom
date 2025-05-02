import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Res,
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
import { Company } from 'src/company/entity/company.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { Coupon } from './entity/coupon.entity';
import { CouponUpdateDto } from 'src/common/dtos/coupon_update.dto';
import { Response } from 'express';
import { of } from 'rxjs';
import { Multer } from 'multer';

@Controller('coupon')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Get()
  getCoupons(): Promise<Coupon[]> {
    return this.couponService.getCoupons();
  }

  @Get('find/:id')
  getCoupon(@Param('id') id: string): Promise<Coupon> {
    return this.couponService.getCouponById(id);
  }

  @Post()
  @Roles(Role.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FileInterceptor('image', CouponImageOption))
  createCoupon(
    @Body() couponDto: CouponDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: Company,
  ): Promise<Coupon> {
    if (!file) {
      throw new ForbiddenException('Image is required');
    }
    return this.couponService.createCoupon(user, couponDto, file);
  }

  @Patch('/:id')
  @Roles(Role.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
  @UseInterceptors(FileInterceptor('image', CouponImageOption))
  updateCoupon(
    @Body() couponDto: CouponUpdateDto,
    @Param('id') id: string,
    @GetUser() user: Company,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Coupon> {
    return this.couponService.updateCoupon(user, id, couponDto, file);
  }

  @Delete('/:id')
  @Roles(Role.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteCoupon(@GetUser() company: Company, @Body('id') id: string) {
    return this.couponService.deleteCoupon(id, company);
  }

  // Coupon image
  @Get('image/:filename')
  getImage(@Param('filename') filename: string, @Res() res: Response) {
    return of(
      res.sendFile(
        process.cwd() + '\\' + process.env.COUPON_IMAGE_URL + filename,
      ),
    );
  }
}
