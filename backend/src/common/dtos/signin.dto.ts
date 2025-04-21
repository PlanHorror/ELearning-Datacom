import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';
import { Role } from '../enums';

export class SignInDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'abc@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  @ValidateIf((o) => !o.username)
  email?: string;

  @ApiProperty({
    description: 'Username of the user',
    example: 'john_doe',
  })
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => !o.email)
  username?: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'CUSTOMER',
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
