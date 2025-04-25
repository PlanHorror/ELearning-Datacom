import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  CustomerSignUpDto,
  CompanySignUpDto,
  UserVerificationDto,
  SignInDto,
} from 'src/common/dtos';
import { AuthService } from './auth.service';
import { Customer } from '../customer/entity/customer.entity';
import { Company } from '../company/entity/company.entity';
import { GetUser, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { Admin } from './entity/admin.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(
    @Body() dto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authService.signin(dto);
  }

  @Post('customer/signup')
  async signup(@Body() customerDto: CustomerSignUpDto): Promise<Customer> {
    return this.authService.customerSignup(customerDto);
  }

  @Post('customer/refresh-token')
  @Roles(Role.CUSTOMER)
  @UseGuards(RefreshTokenGuard, RolesGuard)
  refreshToken(@GetUser() user: Customer): { accessToken: string } {
    return this.authService.refreshToken(user);
  }

  @Post('company/signup')
  async companySignup(@Body() companyDto: CompanySignUpDto): Promise<Company> {
    return this.authService.companySignup(companyDto);
  }

  @Post('company/refresh-token')
  @Roles(Role.COMPANY)
  @UseGuards(RefreshTokenGuard, RolesGuard)
  companyRefreshToken(@GetUser() user: Company) {
    return this.authService.refreshToken(undefined, user);
  }

  @Post('admin/refresh-token')
  @Roles(Role.ADMIN)
  @UseGuards(RefreshTokenGuard, RolesGuard)
  adminRefreshToken(@GetUser() user: Admin) {
    return this.authService.refreshToken(undefined, undefined, user);
  }

  @Get('verify/:token')
  async verify(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Get('resend-verification')
  async resendVerification(@Body() dto: UserVerificationDto) {
    return this.authService.sendVerificationEmail(dto);
  }
}
