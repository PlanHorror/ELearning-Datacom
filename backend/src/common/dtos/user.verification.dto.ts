import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Role } from 'src/common/enums';
import { ApiProperty } from '@nestjs/swagger';

// DTO for user verification
export class UserVerificationDto {
  @ApiProperty({
    description: 'Email address to verify',
    example: 'user@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Role of the user being verified',
    enum: Role,
    example: 'CUSTOMER',
  })
  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;
}
