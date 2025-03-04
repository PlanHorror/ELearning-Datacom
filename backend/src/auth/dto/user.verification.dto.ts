import { IsEmail, IsEnum } from 'class-validator';
import { Role } from '../enum.model';

// DTO for user verification
export class UserVerificationDto {
  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;
}
