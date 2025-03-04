import { IsEmail, IsString } from 'class-validator';

export class EmailDto {
  @IsEmail()
  email: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;
}
