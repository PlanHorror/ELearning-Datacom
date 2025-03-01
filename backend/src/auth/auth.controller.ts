import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  CustomerSignInDto,
  CustomerSignUpDto,
} from './dto/customer.credential.dto';
import { AuthService } from './auth.service';
import {
  CompanySignInDto,
  CompanySignUpDto,
} from './dto/company.credential.dto';
import { User } from './entity/user.entity';
import { Company } from './entity/company.entity';
import { UserVerificationDto } from './dto/user.verification.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('user/signup')
  async signup(@Body() userDto: CustomerSignUpDto): Promise<User> {
    return this.authService.customerSignup(userDto);
  }

  @Post('user/signin')
  async signin(
    @Body() userDto: CustomerSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.customerSignin(userDto);
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

  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Get('resend-verification')
  async resendVerification(@Body() dto: UserVerificationDto) {
    return this.authService.sendVerificationEmail(dto);
  }
}
