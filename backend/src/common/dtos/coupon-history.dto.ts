import { IsEnum, IsString } from 'class-validator';
import { PointsHistoryType } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class CouponHistoryDto {
  @ApiProperty({
    description: 'Customer ID associated with this coupon history',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  customer_id: string;

  @ApiProperty({
    description: 'Type of coupon history record',
    enum: PointsHistoryType,
    example: 'USED',
  })
  @IsEnum(PointsHistoryType)
  type: PointsHistoryType;

  @ApiProperty({
    description: 'Description of the coupon history event',
    example: 'Coupon redeemed at checkout',
  })
  @IsString()
  description: string;
}
