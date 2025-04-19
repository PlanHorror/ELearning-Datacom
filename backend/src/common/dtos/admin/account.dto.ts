import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  @ApiProperty({
    description: 'Account username',
    example: 'admin_user',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Account password',
    example: 'securePassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
