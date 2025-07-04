import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxDate,
  MaxLength,
  MinDate,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Gender, Status } from 'src/common/enums';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// DTO for Customer sign up
export class CustomerSignUpDto {
  @ApiProperty({
    description: 'Customer email address',
    example: 'customer@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Customer password',
    example: 'password123',
    minLength: 8,
    maxLength: 14,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(14)
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
    example: 'MALE',
  })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({
    description: 'Customer date of birth',
    type: Date,
    example: '1990-01-01',
  })
  @Transform(({ value }) => new Date(value))
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 5)))
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 100)))
  @IsDate()
  @IsNotEmpty()
  dob: Date;
}

// DTO for Customer update
export class CustomerUpdateDto {
  @ApiProperty({
    description: 'Updated customer username',
    example: 'johndoe_updated',
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    description: 'Updated customer postal code',
    example: '234-5678',
  })
  @IsString()
  @IsOptional()
  postal_code: string;

  @ApiProperty({
    description: 'Updated customer prefecture',
    example: 'Osaka',
  })
  @IsString()
  @IsOptional()
  prefecture: string;

  @ApiProperty({
    description: 'Updated customer gender',
    enum: Gender,
    example: 'FEMALE',
  })
  @IsEnum(Gender)
  @IsOptional()
  gender: Gender;

  @ApiProperty({
    description: 'Updated customer date of birth',
    type: Date,
    example: '1992-01-01',
  })
  @Transform(({ value }) => new Date(value))
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 5)))
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 100)))
  @IsDate()
  @IsNotEmpty()
  dob: Date;

  @ApiPropertyOptional({
    description: 'Old customer password',
    example: 'oldpassword123',
    minLength: 8,
    maxLength: 14,
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  old_password: string;

  @ApiPropertyOptional({
    description: 'Updated customer password',
    example: 'newpassword123',
    minLength: 8,
    maxLength: 14,
  })
  @ValidateIf((o) => !!o.old_password)
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  @IsNotEmpty()
  new_password: string;

  @ApiPropertyOptional({
    description: 'Confirm new password',
    example: 'newpassword123',
    minLength: 8,
    maxLength: 14,
  })
  @ValidateIf((o) => !!o.new_password)
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  @IsNotEmpty()
  confirm_password: string;
}

// DTO for reset password
export class ResetPasswordDto {
  @ApiPropertyOptional({
    description: 'Current password',
    example: 'currentPass123',
    minLength: 8,
    maxLength: 14,
  })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'newPass123',
    minLength: 8,
    maxLength: 14,
  })
  @ValidateIf((o) => !!o.oldPassword)
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({
    description: 'Confirm new password',
    example: 'newPass123',
    minLength: 8,
    maxLength: 14,
  })
  @ValidateIf((o) => !!o.newPassword)
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  @IsNotEmpty()
  confirmPassword: string;
}

export class CustomerRawDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

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
  @Transform(({ value }) => new Date(value))
  dob: Date;

  @IsNumberString()
  @IsNotEmpty()
  points: number;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
