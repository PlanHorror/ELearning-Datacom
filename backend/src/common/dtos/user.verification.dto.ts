import { IsEmail, IsEnum } from 'class-validator';
import { Role } from 'src/common/enums';

// DTO for user verification
export class UserVerificationDto {
  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;
}
