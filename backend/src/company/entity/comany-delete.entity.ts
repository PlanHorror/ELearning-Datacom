import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from 'src/common/enums';
import { Coupon } from 'src/coupon/entity/coupon.entity';

// Company entity class
@Entity()
export class CompanyDelete {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  old_id: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  company_name: string;

  @Column()
  created_at: Date;

  @Column()
  last_updated: Date;

  @Column()
  last_login: Date;

  @CreateDateColumn()
  deleted_at: Date;
}
