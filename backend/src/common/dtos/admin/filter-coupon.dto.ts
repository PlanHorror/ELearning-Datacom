import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CouponStatus } from 'src/common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class FilterCouponDto {
  @ApiProperty({
    description: 'Company ID to filter coupons by',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  companyId: string;

  @ApiProperty({
    description: 'Label ID to filter coupons by',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  labelId?: string;

  @ApiProperty({
    description: 'Coupon status to filter by',
    enum: CouponStatus,
    example: 'ACTIVE',
    required: false,
  })
  @IsEnum(CouponStatus)
  @IsOptional()
  status?: CouponStatus;

  @ApiProperty({
    description: 'Coupon title to search for',
    example: 'Summer Sale',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Coupon code to search for',
    example: 'SUMMER50',
    required: false,
  })
  @IsString()
  @IsOptional()
  useCode?: string;
}
