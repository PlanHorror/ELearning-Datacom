import { IsNotEmpty, IsString } from 'class-validator';

// DTO for Admin sign in
export class AdminSignInDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
