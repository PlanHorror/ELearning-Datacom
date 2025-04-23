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
import { Gender, Status } from 'src/common/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerDeletedEntityDto {
  @ApiProperty({
    description: 'Original ID of the deleted customer',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  old_id: string;

  @ApiProperty({
    description: 'Customer email address',
    example: 'customer@example.com',
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Customer username',
    example: 'johndoe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Customer password (hashed)',
    example: 'hashedpassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

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
    description: 'Date when the customer account was deleted',
    type: Date,
    example: '2023-01-01T00:00:00Z',
  })
  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  deleted_at: Date;
}
