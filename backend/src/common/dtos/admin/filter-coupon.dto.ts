import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CouponStatus } from 'src/common/enums';

export class FilterCouponDto {
  @IsUUID()
  @IsOptional()
  companyId: string;

  @IsUUID()
  @IsOptional()
  labelId?: string;

  @IsEnum(CouponStatus)
  @IsOptional()
  status?: CouponStatus;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  useCode?: string;
}
