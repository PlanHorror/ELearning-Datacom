import {
  Body,
  Controller,
  Delete,
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
  CompanySignInDto,
  CompanySignUpDto,
  CompanyUpdateDto,
  UserVerificationDto,
  AdminSignInDto,
} from 'src/common/dtos';
import { AuthService } from './auth.service';
import { Customer } from './entity/customer.entity';
import { Company } from './entity/company.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser, Roles } from 'src/common/decorators';
import { Role } from 'src/common/enums';
import { RolesGuard } from 'src/common/guards/authorized.guard';
import { RefreshTokenGuard } from 'src/common/guards/refresh-token.guard';
import { Admin } from './entity/admin.entity';
import { CustomerDelete } from './entity/customer-delete.entity';
import { CompanyDelete } from './entity/comany-delete.entity';

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

  @Get('customers/deleted')
  async getAllDeletedCustomers(): Promise<CustomerDelete[]> {
    return this.authService.getAllDeletedCustomers();
  }

  @Get('companies/deleted')
  async getAllDeletedCompanies(): Promise<CompanyDelete[]> {
    return this.authService.getAllDeletedCompanies();
  }

  @Get('customer/profile')
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async getCustomerProfile(@GetUser() user: Customer): Promise<Customer> {
    return this.authService.getCustomerById(user.id);
  }

  @Get('company/profile')
  @Roles(Role.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
  async getCompanyProfile(@GetUser() user: Company): Promise<Company> {
    return this.authService.getCompanyById(user.id);
  }

  @Post('customer/signup')
  async signup(@Body() customerDto: CustomerSignUpDto): Promise<Customer> {
    return this.authService.customerSignup(customerDto);
  }

  @Post('customer/signin')
  async signin(
    @Body() customerDto: CustomerSignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.customerSignin(customerDto);
  }

  @Post('customer/refresh-token')
  @Roles(Role.CUSTOMER)
  @UseGuards(RefreshTokenGuard, RolesGuard)
  async refreshToken(
    @GetUser() user: Customer,
  ): Promise<{ accessToken: string }> {
    return await this.authService.refreshToken(user);
  }

  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
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

  @Delete('customer')
  @Roles(Role.CUSTOMER)
  @UseGuards(AuthGuard(), RolesGuard)
  async delete(
    @GetUser() thisCustomer: Customer,
  ): Promise<{ message: string }> {
    return this.authService.customerDelete(thisCustomer);
  }

  @Post('company/signup')
  async companySignup(@Body() companyDto: CompanySignUpDto): Promise<Company> {
    return this.authService.companySignup(companyDto);
  }

  @Post('company/signin')
  async companySignin(
    @Body() companyDto: CompanySignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.companySignin(companyDto);
  }

  @Post('company/refresh-token')
  @Roles(Role.COMPANY)
  @UseGuards(RefreshTokenGuard, RolesGuard)
  async companyRefreshToken(@GetUser() user: Company) {
    return await this.authService.refreshToken(undefined, user);
  }

  @Roles(Role.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
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

  @Delete('company')
  @Roles(Role.COMPANY)
  @UseGuards(AuthGuard(), RolesGuard)
  async companyDelete(@GetUser() thisCompany: Company) {
    return this.authService.companyDelete(thisCompany);
  }

  @Post('admin/signin')
  async adminSignin(
    @Body() adminDto: AdminSignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.adminSignin(adminDto);
  }

  @Post('admin/signup')
  async adminSignup(@Body() adminDto: AdminSignInDto) {
    return this.authService.addAdmin(adminDto);
  }

  @Post('admin/refresh-token')
  @Roles(Role.ADMIN)
  @UseGuards(RefreshTokenGuard, RolesGuard)
  async adminRefreshToken(@GetUser() user: Admin) {
    return await this.authService.refreshToken(undefined, undefined, user);
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
