import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { Role } from './enum.model';
import { Customer } from './entity/customer.entity';
import { Company } from './entity/company.entity';
import { Admin } from 'typeorm';

// Role decorator
export const ROLE_KEY = 'role';
export const Roles = (...roles: Role[]) => SetMetadata(ROLE_KEY, roles);

// Get user decorator
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): Customer | Company | Admin =>
    ctx.switchToHttp().getRequest().user,
);
