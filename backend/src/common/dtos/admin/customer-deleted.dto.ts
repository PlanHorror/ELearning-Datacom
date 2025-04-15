import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import { Gender, Status } from 'src/common/enums';

export class CustomerDeletedEntityDto {
  @IsString()
  @IsNotEmpty()
  old_id: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  prefecture: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  dob: Date;

  @IsNumberString()
  @IsNotEmpty()
  points: number;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  created_at: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  last_updated: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  last_login: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  deleted_at: Date;
}
