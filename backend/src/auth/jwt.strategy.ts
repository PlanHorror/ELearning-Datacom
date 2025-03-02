import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Customer } from './entity/customer.entity';
import { Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { Admin } from './entity/admin.entity';
import { JwtPayload } from './jwt.payload.interface';
import { Role } from './enum.model';

// JwtStrategy class a custom strategy that extends the PassportStrategy class to validate the JWT token.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {
    console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
    super({
      secretOrKey: process.env.JWT_SECRET!,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // The validate() method is called by Passport after the token is validated.
  // The method returns the user if the token is valid.
  async validate(payload: JwtPayload) {
    const { name, email, role } = payload || {};
    if (role === Role.CUSTOMER) {
      const customer = await this.customerRepository.findOneBy({ email });
      if (!customer) {
        throw new NotFoundException('User not found');
      }
      return { ...customer, role: Role.CUSTOMER };
    }
    if (role === Role.COMPANY) {
      const company = await this.companyRepository.findOneBy({ email });
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      return { ...company, role: Role.COMPANY };
    }
    if (role === Role.ADMIN) {
      const admin = await this.adminRepository.findOneBy({ username: name });
      if (!admin) {
        throw new NotFoundException('Admin not found');
      }
      return { ...admin, role: Role.ADMIN };
    }
  }
}
