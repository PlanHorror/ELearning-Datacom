import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class CouponFavouriteDto {
  @ApiProperty({
    description: 'Customer ID associated with this coupon favourite',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  customer_id: string;

  @ApiProperty({
    description: 'Coupon ID associated with this favourite',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  coupon_id: string;

  @ApiProperty({
    description: 'Date when the coupon was added to favourites',
    example: '2023-10-01T12:00:00Z',
    required: false,
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  created_at: Date;

  @ApiProperty({
    description: 'Date when the coupon was last updated',
    example: '2023-10-01T12:00:00Z',
    required: false,
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  updated_at: Date;
}
