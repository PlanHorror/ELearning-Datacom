import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Status } from 'src/common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CompanyDeletedEntityDto {
  @ApiProperty({
    description: 'Original ID of the deleted company',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  old_id: string;

  @ApiProperty({
    description: 'Company email address',
    example: 'contact@company.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Company physical address',
    example: '123 Business St, Tokyo, Japan',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Company registered name',
    example: 'Acme Corporation',
  })
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty({
    description: 'Account creation date',
    type: Date,
    example: '2023-01-01T00:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  created_at: Date;

  @ApiProperty({
    description: 'Last updated date',
    type: Date,
    example: '2023-01-01T00:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  last_updated: Date;

  @ApiProperty({
    description: 'Last login date',
    type: Date,
    example: '2023-01-01T00:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  last_login: Date;

  @ApiProperty({
    description: 'Date when the company account was deleted',
    type: Date,
    example: '2023-01-01T00:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  deleted_at: Date;
}
