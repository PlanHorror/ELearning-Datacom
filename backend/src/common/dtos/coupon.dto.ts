import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { IsAfter } from '../validators';
import { Classification } from '../enums';
import { ApiProperty } from '@nestjs/swagger';

export class CouponDto {
  @ApiProperty({ description: 'The title of the coupon', example: '50% Off' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The start date of the coupon',
    example: '2025-01-01',
  })
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  @IsDate()
  @IsNotEmpty()
  period_start: Date;

  @ApiProperty({
    description: 'The end date of the coupon',
    example: '2025-12-31',
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsAfter('period_start')
  @IsNotEmpty()
  period_end: Date;

  @ApiProperty({
    description: 'The classification of the coupon',
    example: 'DISCOUNT',
  })
  @IsEnum(Classification)
  @IsNotEmpty()
  classification: Classification;

  @ApiProperty({
    description: 'The points required to use the coupon',
    example: 100,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  use_point: number;

  @ApiProperty({
    description: 'The unique code for the coupon',
    example: 'SAVE50',
  })
  @IsString()
  @IsNotEmpty()
  use_code: string;

  @ApiProperty({
    description: 'Additional comments about the coupon',
    example: 'Limited time offer',
    required: false,
  })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiProperty({
    description: 'Detailed information about the coupon',
    example: 'Applicable on all items',
    required: false,
  })
  @IsString()
  @IsOptional()
  detail: string;

  @ApiProperty({
    description: 'The label associated with the coupon',
    example: 'Holiday Sale',
  })
  @IsString()
  @IsOptional()
  label: string;
}
