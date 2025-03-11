import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import { IsAfter } from '../validators';
import { Classification } from '../enums';

export class CouponDto {
  @IsString()
  title: string;

  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
  @IsDate()
  period_start: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsAfter('period_start')
  period_end: Date;

  @IsEnum(Classification)
  classification: Classification;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  use_point: number;

  @IsString()
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
