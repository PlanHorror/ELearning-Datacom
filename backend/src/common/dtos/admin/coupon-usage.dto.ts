import { ApiProperty } from '@nestjs/swagger';
import {
  IsUUID,
  IsNotEmpty,
  IsDate,
  IsOptional,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { CouponUsageStatus } from 'src/common/enums';

export class CouponUsageDto {
  @ApiProperty({
    description: 'Customer ID associated with this coupon usage',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty({
    description: 'Coupon ID associated with this usage',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  coupon_id: string;

  @ApiProperty({
    description: 'Status of the coupon usage',
    example: CouponUsageStatus.UNUSED,
    enum: [CouponUsageStatus],
  })
  @IsNotEmpty()
  @IsEnum(CouponUsageStatus)
  status: CouponUsageStatus;

  @ApiProperty({
    description: 'Date when the coupon was used',
    example: '2023-10-01T12:00:00Z',
    required: false,
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  create_at?: Date;

  @ApiProperty({
    description: 'Subtract points from the customer or not',
    example: true,
    required: false,
  })
  @IsBoolean()
  @Transform(({ value }) => Boolean(value))
  subtract_points?: boolean;
}
