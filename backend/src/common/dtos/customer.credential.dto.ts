import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxDate,
  MaxLength,
  MinDate,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Gender } from 'src/common/enums';
import { Transform } from 'class-transformer';

// DTO for Customer sign up
export class CustomerSignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(14)
  @IsNotEmpty()
  password: string;

  @IsString()
  username: string;

  @IsString()
  postal_code: string;

  @IsString()
  prefecture: string;

  @IsEnum(Gender)
  gender: Gender;

  @Transform(({ value }) => new Date(value))
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 5)))
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 100)))
  @IsDate()
  dob: Date;
}

// DTO for Customer sign in
export class CustomerSignInDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(14)
  password: string;
}

// DTO for Customer update
export class CustomerUpdateDto {
  @IsString()
  username: string;

  @IsString()
  postal_code: string;

  @IsString()
  prefecture: string;

  @IsEnum(Gender)
  gender: Gender;

  @Transform(({ value }) => new Date(value))
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 5)))
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 100)))
  @IsDate()
  dob: Date;
}

// DTO for reset password
export class ResetPasswordDto {
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  oldPassword: string;

  @ValidateIf((o) => !!o.oldPassword)
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  newPassword: string;

  @ValidateIf((o) => !!o.newPassword)
  @IsString()
  @MinLength(8)
  @MaxLength(14)
  confirmPassword: string;
}
