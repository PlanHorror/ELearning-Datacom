import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../customer/entity/customer.entity';
import { Admin } from './entity/admin.entity';
import { Company } from '../company/entity/company.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  CustomerSignUpDto,
  CompanySignUpDto,
  UserVerificationDto,
  AdminSignInDto,
  SignInDto,
} from 'src/common/dtos';
import { Role, Status } from 'src/common/enums';
import { JwtStatusPayload } from 'src/common/interfaces';
import { EmailService } from 'src/email/email.service';
import { CustomerService } from 'src/customer/customer.service';
import { CompanyService } from 'src/company/company.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
    private emailService: EmailService,
    @Inject(forwardRef(() => CustomerService))
    private customerService: CustomerService,
    @Inject(forwardRef(() => CompanyService))
    private companyService: CompanyService,
  ) {}

  // Signin service
  async signin(
    dto: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!dto) {
      throw new BadRequestException('Not enough data provided');
    }
    const companySignin = await this.companyService.checkEmailExists(dto.email);
    const customerSignin = await this.customerService.checkEmailExists(
      dto.email,
    );
    if (companySignin && customerSignin) {
      throw new ConflictException(
        'This account is already registered as a company and customer',
      );
    }
    if (companySignin) {
      return await this.companySignin(dto);
    }
    if (customerSignin) {
      return await this.customerSignin(dto);
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  // Customer signup service
  async customerSignup(user: CustomerSignUpDto): Promise<Customer> {
    if (
      (await this.customerService.checkEmailExists(user.email)) ||
      (await this.companyService.checkEmailExists(user.email))
    ) {
      throw new ConflictException('Username or email already exists');
    }
    const { password, ...userInfomation } = user;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await this.customerService.createCustomer({
      ...userInfomation,
      password: hashedPassword,
      points: 0,
      status: Status.INACTIVE,
    });
    try {
      const verificationDto: UserVerificationDto = {
        email: newUser.email,
        role: Role.CUSTOMER,
      };
      await this.sendVerificationEmail(verificationDto);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Username or email already exists')
        : new InternalServerErrorException();
    }
    // If after 15 minutes the customer is not verified, delete the customer
    setTimeout(() => {
      (async () => {
        await this.deleteUnverifiedAccount(newUser.email, Role.CUSTOMER);
      })();
    }, 900000);
    return newUser;
  }

  // Customer signin service
  async customerSignin(
    user: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = user;
    const thisUser = await this.customerService.getCustomerByEmail(email);
    if (thisUser && (await bcrypt.compare(password, thisUser.password))) {
      if (thisUser.status === Status.INACTIVE) {
        throw new UnauthorizedException('Account not verified');
      } else if (thisUser.status === Status.BANNED) {
        throw new UnauthorizedException('Account is banned');
      }
      const payload = {
        _id: thisUser.id,
        email: user.email,
        role: Role.CUSTOMER,
        username: thisUser.username,
      };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });
      thisUser.last_login = new Date();
      await this.customerService.updateCustomerLoginTime(thisUser.id);
      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  refreshToken(
    customer?: Customer,
    company?: Company,
  ): { accessToken: string } {
    if (customer && company) {
      throw new BadRequestException('Invalid account');
    }
    if (customer) {
      const payload = { email: customer.email, role: Role.CUSTOMER };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else if (company) {
      const payload = { email: company.email, role: Role.COMPANY };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid account');
    }
  }

  // Company signup service
  async companySignup(company: CompanySignUpDto): Promise<Company> {
    if (
      (await this.customerService.checkEmailExists(company.email)) ||
      (await this.companyService.checkEmailExists(company.email))
    ) {
      throw new ConflictException('Email already exists');
    }
    const { password, ...companyInformation } = company;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newCompany = await this.companyService.createCompany({
      ...companyInformation,
      password: hashedPassword,
      status: Status.INACTIVE,
    });
    try {
      const verificationDto: UserVerificationDto = {
        email: newCompany.email,
        role: Role.COMPANY,
      };
      await this.sendVerificationEmail(verificationDto);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Email already exists')
        : new InternalServerErrorException();
    }
    // If after 15 minutes the company is not verified, delete the company
    setTimeout(() => {
      (async () => {
        await this.deleteUnverifiedAccount(newCompany.email, Role.COMPANY);
      })();
    }, 900000);
    return newCompany;
  }

  // Company signin service
  async companySignin(
    company: SignInDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = company;
    const thisCompany = await this.companyService.getCompanyByEmail(email);
    if (thisCompany && (await bcrypt.compare(password, thisCompany.password))) {
      if (thisCompany.status === Status.INACTIVE) {
        throw new UnauthorizedException('Account not verified');
      } else if (thisCompany.status === Status.BANNED) {
        throw new UnauthorizedException('Account is banned');
      }
      const payload = {
        _id: thisCompany.id,
        email: company.email,
        company_name: thisCompany.company_name,
        role: Role.COMPANY,
      };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });
      thisCompany.last_login = new Date();
      await this.companyService.setCompanyLoginTime(thisCompany.id);
      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  // Admin signin service
  async adminSignin(adminDto: AdminSignInDto): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const { username, password } = adminDto;
    const admin = await this.adminRepository.findOneBy({ username });
    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload = { username, role: Role.ADMIN };
      const accessToken = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });
      return { accessToken, refreshToken };
    } else {
      throw new UnauthorizedException('Invalid username or password');
    }
  }

  // Send verification email service
  async sendVerificationEmail(dto: UserVerificationDto): Promise<void> {
    const { email, role } = dto;
    const user =
      role === Role.CUSTOMER
        ? await this.customerService.getCustomerByEmail(email)
        : await this.companyService.getCompanyByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid account');
    }
    const payload: JwtStatusPayload = { email, role, status: Status.ACTIVE };
    const userVerifyToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_VERIFY_SECRET,
      expiresIn: '5m',
    });
    this.emailService.sendVerificationEmail(user.email, userVerifyToken);
  }

  // Verify email service
  async verifyEmail(token: string): Promise<{ message: string }> {
    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_VERIFY_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    const payload = this.jwtService.decode(token);
    const { email, role, status } = payload;
    if (role === Role.CUSTOMER) {
      const user = await this.customerService.getCustomerByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Invalid account');
      }
      await this.customerService.updateCustomerStatus(user.id, status);
      return { message: 'Verified successfully' };
    } else if (role === Role.COMPANY) {
      const company = await this.companyService.getCompanyByEmail(email);
      if (!company) {
        throw new UnauthorizedException('Invalid account');
      }
      await this.companyService.updateCompanyStatus(company.id, status);
      return { message: 'Verified successfully' };
    } else {
      throw new UnauthorizedException('Invalid');
    }
  }

  // Delete account when not verified
  async deleteUnverifiedAccount(email: string, role: Role): Promise<void> {
    if (role === Role.CUSTOMER) {
      const user = await this.customerService.getCustomerByEmail(email);
      if (!user) {
        return;
      }
      if (user.status == Status.INACTIVE) {
        await this.customerService.deleteCustomer(user.id);
      }
    } else if (role === Role.COMPANY) {
      const company = await this.companyService.getCompanyByEmail(email);
      if (!company) {
        return;
      }
      if (company.status == Status.INACTIVE) {
        await this.companyService.deleteCompany(company.id);
      }
    }
  }
}
