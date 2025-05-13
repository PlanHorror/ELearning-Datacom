import { Admin } from 'src/auth/entity/admin.entity';
import { Role } from '../enums';

// Export role and customer from strategy interface
export class AdminStrategyInterface {
  role: Role;
  admin: Admin;
}
