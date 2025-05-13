import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO for Admin sign in
export class AdminSignInDto {
  @ApiProperty({
    description: 'The username of the admin',
    example: 'admin_user',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the admin',
    example: 'securePassword123',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
