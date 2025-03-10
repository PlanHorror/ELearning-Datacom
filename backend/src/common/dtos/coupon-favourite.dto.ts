import { IsString } from 'class-validator';

export class CouponFavouriteDto {
  @IsString()
  couponId: string;
}
