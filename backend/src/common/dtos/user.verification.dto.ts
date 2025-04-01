import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/enums';

// DTO for user verification
export class UserVerificationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
