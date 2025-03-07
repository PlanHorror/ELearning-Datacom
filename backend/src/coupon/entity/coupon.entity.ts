import { Company } from 'src/auth/entity/company.entity';
import { Classification, CouponStatus } from 'src/common/enums';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CouponLabel } from '../../coupon-label/entity/coupon-label.entity';

@Entity()
@Unique(['use_code', 'company'])
export class Coupon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Company, (company) => company.coupons, {
    onDelete: 'CASCADE',
    eager: true,
  })
  company: Company;

  @Column()
  title: string;

  @Column()
  period_start: Date;

  @Column()
  period_end: Date;

  @Column({ type: 'enum', enum: Classification })
  classification: Classification;

  @Column()
  use_point: number;

  @Column()
  use_code: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  comment: string;

  @Column({ nullable: true })
  detail: string;

  @Column()
  created_at: Date;

  @Column()
  last_updated: Date;

  @Column({ type: 'enum', enum: CouponStatus, default: CouponStatus.ACTIVE })
  status: CouponStatus;

  @ManyToOne(() => CouponLabel, (couponLabel) => couponLabel.coupons, {
    onDelete: 'SET NULL',
    eager: true,
  })
  label: CouponLabel;
}
