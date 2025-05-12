import { Admin } from 'src/auth/entity/admin.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Coupon } from '../../entity/coupon.entity';

@Entity()
export class CouponLabel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  label: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_updated: Date;

  @OneToMany((_type) => Coupon, (coupon) => coupon.label)
  coupons: Coupon[];
}
