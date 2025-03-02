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
} from './dto/customer.credential.dto';
import {
  CompanySignInDto,
  CompanySignUpDto,
} from './dto/company.credential.dto';
import { Role, Status } from './enum.model';
import { JwtStatusPayload } from './jwt.payload.interface';
import { EmailService } from 'src/email/email.service';
import { UserVerificationDto } from './dto/user.verification.dto';

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
        throw new UnauthorizedException('User not verified');
      } else if (thisUser.status === Status.BANNED) {
        throw new UnauthorizedException('User is banned');
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
    await this.customerRepository.save(thisCustomer);
    return thisCustomer;
  }

  // Customer delete service
  async customerDelete() {}

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
        throw new UnauthorizedException('Company not verified');
      } else if (thisCompany.status === Status.BANNED) {
        throw new UnauthorizedException('Company is banned');
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
  async companyUpdate() {}

  // Company delete service
  async companyDelete() {}

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
      throw new UnauthorizedException('Invalid user');
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
    console.log(payload);
    const { email, role, status } = payload;
    if (role === Role.CUSTOMER) {
      const user = await this.customerRepository.findOneBy({ email });
      if (!user) {
        throw new UnauthorizedException('Invalid user');
      }
      user.status = status;
      await this.customerRepository.save(user);
      console.log(user);
      return { message: 'Verified successfully' };
    } else if (role === Role.COMPANY) {
      const company = await this.companyRepository.findOneBy({ email });
      if (!company) {
        throw new UnauthorizedException('Invalid company');
      }
      company.status = status;
      await this.companyRepository.save(company);
      return { message: 'Verified successfully' };
    } else {
      throw new UnauthorizedException('Invalid');
    }
  }
}
