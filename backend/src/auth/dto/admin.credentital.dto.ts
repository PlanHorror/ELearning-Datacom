import { IsString } from 'class-validator';

// DTO for Admin sign in
export class AdminSignInDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
