import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { Company } from './entity/company.entity';
import { Admin } from './entity/admin.entity';
import { JwtPayload } from './jwt.payload.interface';
import { Role } from './enum.model';

// JwtStrategy class a custom strategy that extends the PassportStrategy class to validate the JWT token.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Company) private companyRepository: Repository<Company>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {
    super({
      secretOrKey: process.env.JWT_SECRET || 'secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // The validate() method is called by Passport after the token is validated.
  // The method returns the user if the token is valid.
  async validate(payload: JwtPayload) {
    const { name, email, role } = payload || {};
    if (role === Role.CUSTOMER) {
      const customer = await this.userRepository.findOneBy({ email });
      if (!customer) {
        throw new NotFoundException('User not found');
      }
      return customer;
    }
    if (role === Role.COMPANY) {
      const company = await this.companyRepository.findOneBy({ email });
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      return company;
    }
    if (role === Role.ADMIN) {
      const admin = await this.adminRepository.findOneBy({ username: name });
      if (!admin) {
        throw new NotFoundException('Admin not found');
      }
      return admin;
    }
  }
}
