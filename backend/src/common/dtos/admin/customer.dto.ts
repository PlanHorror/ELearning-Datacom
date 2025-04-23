import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender, Status } from 'src/common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerEntityDto {
  @ApiProperty({
    description: 'Customer email address',
    example: 'customer@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Customer password',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Customer username',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Customer postal code',
    example: '123-4567',
  })
  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @ApiProperty({
    description: 'Customer prefecture',
    example: 'Tokyo',
  })
  @IsString()
  @IsNotEmpty()
  prefecture: string;

  @ApiProperty({
    description: 'Customer gender',
    enum: Gender,
    example: Gender.MALE,
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({
    description: 'Customer date of birth',
    type: Date,
    example: '1990-01-01',
  })
  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  dob: Date;

  @ApiProperty({
    description: 'Customer points balance',
    example: '1000',
  })
  @IsNumberString()
  @IsNotEmpty()
  points: number;

  @ApiProperty({
    description: 'Customer account status',
    enum: Status,
    example: Status.ACTIVE,
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;

  @ApiProperty({
    description: 'Account creation date',
    type: Date,
    example: '2023-01-01T00:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  created_at: Date;

  @ApiProperty({
    description: 'Last updated date',
    type: Date,
    example: '2023-01-01T00:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  last_updated: Date;

  @ApiProperty({
    description: 'Last login date',
    type: Date,
    example: '2023-01-01T00:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  last_login: Date;
}
