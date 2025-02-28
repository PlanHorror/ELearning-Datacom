import { Body, Controller, Post } from '@nestjs/common';
import { UserSignInDto, UserSignUpDto } from './dto/user.credential.dto';
import { AuthService } from './auth.service';
import {
  CompanySignInDto,
  CompanySignUpDto,
} from './dto/company.credential.dto';
import { User } from './entity/user.entity';
import { Company } from './entity/company.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/signup')
  async signup(@Body() userDto: UserSignUpDto): Promise<User> {
    return this.authService.userSignup(userDto);
  }

  @Post('user/signin')
  async signin(
    @Body() userDto: UserSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.userSignin(userDto);
  }

  @Post('company/signup')
  async companySignup(@Body() companyDto: CompanySignUpDto): Promise<Company> {
    return this.authService.companySignup(companyDto);
  }

  @Post('company/signin')
  async companySignin(
    @Body() companyDto: CompanySignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.companySignin(companyDto);
  }

  @Post('admin/signin')
  async adminSignin() {}
}
