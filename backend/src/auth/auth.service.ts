import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entity/customer.entity';
import { Admin } from './entity/admin.entity';
import { Company } from './entity/company.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  CustomerSignInDto,
  CustomerSignUpDto,
  CustomerUpdateDto,
  ResetPasswordDto,
  CompanySignInDto,
  CompanySignUpDto,
  CompanyUpdateDto,
  UserVerificationDto,
} from 'src/common/dtos';
import { Role, Status } from 'src/common/enums';
import { JwtStatusPayload } from 'src/common/interfaces';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,

    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,

    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  // Take all customers
  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  // Take all companies
  async getAllCompanies(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  // Customer signup service
  async customerSignup(user: CustomerSignUpDto): Promise<Customer> {
    const { password, ...userInfomation } = user;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.customerRepository.create({
      ...userInfomation,
      password: hashedPassword,
    });
    try {
      await this.customerRepository.save(newUser);
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
    user: CustomerSignInDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = user;
    const thisUser = await this.customerRepository.findOneBy({ email });
    if (thisUser && (await bcrypt.compare(password, thisUser.password))) {
      if (thisUser.status === Status.INACTIVE) {
        throw new UnauthorizedException('Account not verified');
      } else if (thisUser.status === Status.BANNED) {
        throw new UnauthorizedException('Account is banned');
      }
      const payload = { email: user.email, role: Role.CUSTOMER };
      const accessToken = this.jwtService.sign(payload);
      thisUser.last_login = new Date();
      await this.customerRepository.save(thisUser);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  // Customer update service
  async customerUpdate(
    customerUpdate: CustomerUpdateDto,
    thisCustomer: Customer,
    customerPassword?: ResetPasswordDto,
  ): Promise<Customer> {
    console.log(customerUpdate);
    const { oldPassword, newPassword, confirmPassword } =
      customerPassword || {};
    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        throw new UnauthorizedException('Password not match');
      }
      if (await bcrypt.compare(oldPassword, thisCustomer.password)) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        thisCustomer.password = hashedPassword;
      } else {
        throw new UnauthorizedException('Invalid old password');
      }
    }
    Object.assign(thisCustomer, customerUpdate);
    thisCustomer.last_updated = new Date();
    try {
      await this.customerRepository.save(thisCustomer);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Username or email already exists')
        : new InternalServerErrorException();
    }
    return thisCustomer;
  }

  // Customer delete service
  async customerDelete(thisCustomer: Customer): Promise<{ message: string }> {
    await this.customerRepository.remove(thisCustomer);
    return { message: 'Account deleted successfully' };
  }

  // Company signup service
  async companySignup(company: CompanySignUpDto): Promise<Company> {
    const { password, ...companyInformation } = company;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newCompany = this.companyRepository.create({
      ...companyInformation,
      password: hashedPassword,
    });
    try {
      await this.companyRepository.save(newCompany);
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
    // If after 15 seconds the company is not verified, delete the company
    setTimeout(() => {
      (async () => {
        await this.deleteUnverifiedAccount(newCompany.email, Role.COMPANY);
      })();
    }, 900000);
    return newCompany;
  }

  // Company signin service
  async companySignin(
    company: CompanySignInDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = company;
    const thisCompany = await this.companyRepository.findOneBy({ email });
    if (thisCompany && (await bcrypt.compare(password, thisCompany.password))) {
      if (thisCompany.status === Status.INACTIVE) {
        throw new UnauthorizedException('Account not verified');
      } else if (thisCompany.status === Status.BANNED) {
        throw new UnauthorizedException('Account is banned');
      }
      const payload = { email: company.email, role: Role.COMPANY };
      const accessToken = this.jwtService.sign(payload);
      thisCompany.last_login = new Date();
      await this.companyRepository.save(thisCompany);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  // Company update service
  async companyUpdate(
    companyUpdateDto: CompanyUpdateDto,
    thisCompany: Company,
    companyResetPassword?: ResetPasswordDto,
  ) {
    const { oldPassword, newPassword, confirmPassword } =
      companyResetPassword || {};
    if (oldPassword && newPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        throw new UnauthorizedException('Password not match');
      }
      if (await bcrypt.compare(oldPassword, thisCompany.password)) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        thisCompany.password = hashedPassword;
      } else {
        throw new UnauthorizedException('Invalid old password');
      }
    }
    Object.assign(thisCompany, companyUpdateDto);
    thisCompany.last_updated = new Date();
    await this.companyRepository.save(thisCompany);
    return thisCompany;
  }

  // Company delete service
  async companyDelete(thisCompany: Company): Promise<{ message: string }> {
    await this.companyRepository.remove(thisCompany);
    return { message: 'Account deleted successfully' };
  }

  // Admin signin service
  async adminSignin() {}

  // Send verification email service
  async sendVerificationEmail(dto: UserVerificationDto): Promise<void> {
    const { email, role } = dto;
    const user =
      role === Role.CUSTOMER
        ? await this.customerRepository.findOneBy({ email })
        : await this.companyRepository.findOneBy({ email });
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
    console.log(token);
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
      const user = await this.customerRepository.findOneBy({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid account');
      }
      user.status = status;
      await this.customerRepository.save(user);
      console.log(user);
      return { message: 'Verified successfully' };
    } else if (role === Role.COMPANY) {
      const company = await this.companyRepository.findOneBy({ email });
      if (!company) {
        throw new UnauthorizedException('Invalid account');
      }
      company.status = status;
      await this.companyRepository.save(company);
      return { message: 'Verified successfully' };
    } else {
      throw new UnauthorizedException('Invalid');
    }
  }

  // Delete account when not verified in 30 seconds
  async deleteUnverifiedAccount(email: string, role: Role): Promise<void> {
    if (role === Role.CUSTOMER) {
      const user = await this.customerRepository.findOneBy({ email });
      if (!user) {
        return;
      }
      if (user.status == Status.INACTIVE) {
        await this.customerRepository.remove(user);
      }
    } else if (role === Role.COMPANY) {
      const company = await this.companyRepository.findOneBy({ email });
      if (!company) {
        return;
      }
      if (company.status == Status.INACTIVE) {
        await this.companyRepository.remove(company);
      }
    }
  }
}
