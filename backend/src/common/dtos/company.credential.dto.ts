import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Import ApiProperty

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
}
