import { Admin } from 'src/auth/entity/admin.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Coupon } from '../../coupon/entity/coupon.entity';

@Entity()
export class CouponLabel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  label: string;

  @Column()
  created_at: Date;

  @Column()
  last_updated: Date;

  @ManyToOne((_type) => Admin, (admin) => admin.couponLabels, {
    onDelete: 'CASCADE',
    eager: false,
  })
  admin: Admin;

  @OneToMany((_type) => Coupon, (coupon) => coupon.label, { eager: true })
  coupons: Coupon[];
}
