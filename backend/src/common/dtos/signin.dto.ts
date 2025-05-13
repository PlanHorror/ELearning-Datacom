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
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'password123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
