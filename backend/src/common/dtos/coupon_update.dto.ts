import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { IsAfter } from '../validators';
import { Classification } from '../enums';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CouponUpdateDto {
  @ApiProperty({ description: 'Title of the coupon' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Start date of the coupon period',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  @IsDate()
  @IsNotEmpty()
  period_start: Date;

  @ApiPropertyOptional({
    description: 'End date of the coupon period',
    type: String,
    format: 'date-time',
  })
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsAfter('period_start')
  @IsNotEmpty()
  period_end: Date;

  @ApiProperty({
    description: 'Classification of the coupon',
    enum: Classification,
  })
  @IsEnum(Classification)
  @IsNotEmpty()
  classification: Classification;

  @ApiProperty({
    description: 'Points required to use the coupon',
    type: Number,
  })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  use_point: number;

  @ApiProperty({ description: 'Code to use the coupon' })
  @IsString()
  @IsNotEmpty()
  use_code: string;

  @ApiPropertyOptional({ description: 'Additional comments about the coupon' })
  @IsString()
  @IsOptional()
  comment: string;

  @ApiPropertyOptional({ description: 'Detailed information about the coupon' })
  @IsString()
  @IsOptional()
  detail: string;

  @ApiPropertyOptional({ description: 'Label for the coupon' })
  @IsString()
  @IsOptional()
  label: string;
}
