import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/common/enums';

export class CompanyDeletedEntityDto {
  @IsString()
  @IsNotEmpty()
  old_id: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  company_name: string;

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
