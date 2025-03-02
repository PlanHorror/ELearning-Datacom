import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  CustomerSignInDto,
  CustomerSignUpDto,
  CustomerUpdateDto,
  ResetPasswordDto,
} from './dto/customer.credential.dto';
import { AuthService } from './auth.service';
import {
  CompanySignInDto,
  CompanySignUpDto,
  CompanyUpdateDto,
} from './dto/company.credential.dto';
import { Customer } from './entity/customer.entity';
import { Company } from './entity/company.entity';
import { UserVerificationDto } from './dto/user.verification.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, Roles } from './authorized.decorator';
import { Role } from './enum.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('customers')
  async getAllCustomers(): Promise<Customer[]> {
    return this.authService.getAllCustomers();
  }

  @Get('companies')
  async getAllCompanies(): Promise<Company[]> {
    return this.authService.getAllCompanies();
  }

  @Post('customer/signup')
  async signup(@Body() customerDto: CustomerSignUpDto): Promise<Customer> {
    return this.authService.customerSignup(customerDto);
  }

  @Post('customer/signin')
  async signin(
    @Body() customerDto: CustomerSignInDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.customerSignin(customerDto);
  }

  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard())
  @Post('customer/update')
  async update(
    @Body() customerUpdateDto: CustomerUpdateDto,
    @GetUser() user: Customer,
    @Body() customerResetPassword?: ResetPasswordDto,
  ): Promise<Customer> {
    return this.authService.customerUpdate(
      customerUpdateDto,
      user,
      customerResetPassword,
    );
  }

  @Post('customer/delete')
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard())
  async delete(@GetUser() thisCustomer: Customer) {
    return this.authService.customerDelete(thisCustomer);
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

  @Roles(Role.COMPANY)
  @UseGuards(AuthGuard())
  @Post('company/update')
  async companyUpdate(
    @Body() companyUpdateDto: CompanyUpdateDto,
    @GetUser() thisCompany: Company,
    @Body() companyResetPassword?: ResetPasswordDto,
  ) {
    return this.authService.companyUpdate(
      companyUpdateDto,
      thisCompany,
      companyResetPassword,
    );
  }

  @Post('company/delete')
  @Roles(Role.COMPANY)
  @UseGuards(AuthGuard())
  async companyDelete(@GetUser() thisCompany: Company) {
    return this.authService.companyDelete(thisCompany);
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
