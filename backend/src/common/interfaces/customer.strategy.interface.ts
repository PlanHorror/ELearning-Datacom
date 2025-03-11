import { Customer } from 'src/auth/entity/customer.entity';
import { Role } from '../enums';

// Export role and customer from strategy interface
export class CustomerStrategyInterface {
  role: Role;
  customer: Customer;
}
