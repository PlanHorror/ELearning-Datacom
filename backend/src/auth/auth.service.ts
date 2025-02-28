import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Admin } from './entity/admin.entity';
import { Company } from './entity/company.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserSignInDto, UserSignUpDto } from './dto/user.credential.dto';
import {
  CompanySignInDto,
  CompanySignUpDto,
} from './dto/company.credential.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

    @InjectRepository(Company)
    private companyRepository: Repository<Company>,

    private jwtService: JwtService,
  ) {}

  // User signup service
  async userSignup(user: UserSignUpDto): Promise<User> {
    const { password, ...userInfomation } = user;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = this.userRepository.create({
      ...userInfomation,
      password: hashedPassword,
    });
    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      throw error.code === '23505'
        ? new ConflictException('Username or email already exists')
        : new InternalServerErrorException();
    }
    return newUser;
  }

  // User signin service
  async userSignin(user: UserSignInDto): Promise<{ accessToken: string }> {
    const { email, password } = user;
    const thisUser = await this.userRepository.findOneBy({ email });
    console.log(await bcrypt.compare('11111111', user.password));
    if (!thisUser) {
      throw new UnauthorizedException('Invalid email');
    }
    if (thisUser && (await bcrypt.compare(password, user.password))) {
      const payload = { email: user.email, role: 'user' };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
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
    if (thisCompany && (await bcrypt.compare(password, company.password))) {
      const payload = { email: company.email, role: 'company' };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid email or password');
    }
  }

  // Admin signin service
  async adminSignin() {}
}
