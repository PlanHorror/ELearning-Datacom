import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class FilterCouponFavouriteDto {
  @ApiProperty({
    description: 'Customer ID to filter by',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  customer_id: string;

  @ApiProperty({
    description: 'Coupon ID to filter by',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  coupon_id: string;
}
