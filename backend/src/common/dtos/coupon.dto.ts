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

export class CouponDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  @IsDate()
  @IsNotEmpty()
  period_start: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsAfter('period_start')
  @IsNotEmpty()
  period_end: Date;

  @IsEnum(Classification)
  @IsNotEmpty()
  classification: Classification;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  use_point: number;

  @IsString()
  @IsNotEmpty()
  use_code: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsString()
  @IsOptional()
  detail: string;

  @IsString()
  @IsOptional()
  label: string;
}
