import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { Classification, CouponStatus } from 'src/common/enums';
import { PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class CouponAdminDto {
  @ApiProperty({
    description: 'Unique identifier for the coupon',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The title of the coupon',
    example: '50% Off Sale',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Start date of the coupon validity period',
    type: Date,
    example: '2023-01-01T00:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  period_start: Date;

  @ApiProperty({
    description: 'End date of the coupon validity period',
    type: Date,
    example: '2023-12-31T23:59:59Z',
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  period_end: Date;

  @ApiProperty({
    description: 'Classification type of the coupon',
    enum: Classification,
    example: 'DISCOUNT',
  })
  @IsEnum(Classification)
  @IsNotEmpty()
  classification: Classification;

  @ApiProperty({
    description: 'Points required to use the coupon',
    example: '100',
  })
  @IsNumberString()
  @IsNotEmpty()
  use_point: number;

  @ApiProperty({
    description: 'Unique code to redeem the coupon',
    example: 'SUMMER50',
  })
  @IsString()
  @IsNotEmpty()
  use_code: string;

  @ApiProperty({
    description: 'Detailed information about the coupon',
    example: 'Applicable on all items except electronics',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  detail: string;

  @ApiProperty({
    description: 'Additional comments about the coupon',
    example: 'Limited time offer',
    required: false,
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  comment: string;

  @ApiProperty({
    description: 'Creation date of the coupon',
    type: Date,
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  created_at: Date;

  @ApiProperty({
    description: 'Last update date of the coupon',
    type: Date,
    example: '2023-01-01T00:00:00Z',
    required: false,
  })
  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  updated_at: Date;

  @ApiProperty({
    description: 'Current status of the coupon',
    enum: CouponStatus,
    example: 'ACTIVE',
  })
  @IsEnum(CouponStatus)
  @IsNotEmpty()
  status: CouponStatus;

  @ApiProperty({
    description: 'Reference to coupon usage ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  coupon_usage_id: string;

  @ApiProperty({
    description: 'Reference to label ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  label_id: string;

  @ApiProperty({
    description: 'Reference to company ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  company_id: string;
}
