import { Company } from 'src/company/entity/company.entity';
import { Role } from '../enums';

// Export role and customer from strategy interface
export class CompanyStrategyInterface {
  role: Role;
  company: Company;
}
