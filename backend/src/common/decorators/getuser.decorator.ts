import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Company } from 'src/company/entity/company.entity';
import { Customer } from 'src/customer/entity/customer.entity';
import { Admin } from 'src/auth/entity/admin.entity';

// Get user decorator
export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext) => ctx.switchToHttp().getRequest().user,
);
