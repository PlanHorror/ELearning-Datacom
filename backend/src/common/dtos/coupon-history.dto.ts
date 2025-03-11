import { IsEnum, IsString } from 'class-validator';
import { CouponHistoryType } from '../enums';

export class CouponHistoryDto {
  @IsString()
  customer_id: string;

  @IsEnum(CouponHistoryType)
  type: CouponHistoryType;

  @IsString()
  description: string;
}
