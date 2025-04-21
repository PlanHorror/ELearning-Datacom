import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty
import { Status } from '../enums';

// DTO for Company sign up
export class CompanySignUpDto {
  @ApiProperty({
    description: 'The email of the company',
    example: 'example@company.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the company',
    example: 'password123',
    minLength: 8,
    maxLength: 14,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  password: string;

  @ApiProperty({
    description: 'The address of the company',
    example: '123 Main St',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'The name of the company', example: 'TechCorp' })
  @IsString()
  @IsNotEmpty()
  company_name: string;
}

// DTO for Company sign in
export class CompanySignInDto {
  @ApiProperty({
    description: 'The email of the company',
    example: 'example@company.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the company',
    example: 'password123',
    minLength: 8,
    maxLength: 14,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  password: string;
}

// DTO for Company update
export class CompanyUpdateDto {
  @ApiProperty({
    description: 'The updated address of the company',
    example: '456 Elm St',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The updated name of the company',
    example: 'NewTechCorp',
  })
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty({
    description: 'The old password of the company',
    example: 'oldpassword123',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  old_password?: string;

  @ApiProperty({
    description: 'The new password of the company',
    example: 'newpassword123',
    minLength: 8,
    maxLength: 14,
    required: false,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  @IsNotEmpty()
  @ValidateIf((o) => o.new_password !== undefined)
  new_password?: string;

  @ApiProperty({
    description: 'The confirmation of the new password',
    example: 'newpassword123',
    required: false,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  @IsNotEmpty()
  @ValidateIf((o) => o.new_password !== undefined)
  confirm_password?: string;
}

export class CompanyRawDto {
  @ApiProperty({
    description: 'The email of the company',
    example: 'abc@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the company',
    example: 'password123',
    minLength: 8,
    maxLength: 14,
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The address of the company',
    example: '123 Main St',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'The name of the company',
    example: 'TechCorp',
  })
  @IsString()
  @IsNotEmpty()
  company_name: string;

  @ApiProperty({
    description: 'The status of the company',
    example: 'ACTIVE',
  })
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
