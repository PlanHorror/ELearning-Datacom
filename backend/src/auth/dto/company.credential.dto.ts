import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

// DTO for Company sign up
export class CompanySignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(14)
  password: string;

  @IsString()
  address: string;

  @IsString()
  company_name: string;
}

// DTO for Company sign in
export class CompanySignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(14)
  password: string;
}
