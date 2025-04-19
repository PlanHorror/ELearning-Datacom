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

export class CouponDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  period_start: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  period_end: Date;

  @IsEnum(Classification)
  @IsNotEmpty()
  classification: Classification;

  @IsNumberString()
  @IsNotEmpty()
  use_point: number;

  @IsString()
  @IsNotEmpty()
  use_code: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  detail: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  comment: string;

  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  created_at: Date;

  @IsDate()
  @IsOptional()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  updated_at: Date;

  @IsEnum(CouponStatus)
  @IsNotEmpty()
  status: CouponStatus;

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  coupon_usage_id: string;

  @IsUUID()
  label_id: string;

  @IsUUID()
  company_id: string;
}
