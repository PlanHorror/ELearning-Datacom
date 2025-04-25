import { Company } from 'src/company/entity/company.entity';
import { Classification, CouponStatus } from 'src/common/enums';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { CouponLabel } from '../../coupon-label/entity/coupon-label.entity';
import { CouponFavourite } from 'src/coupon-favourite/entity/coupon-favourite.entity';
import { CouponUsage } from 'src/coupon-useage/entity/coupon-usage.entity';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  last_updated: Date;

  @Column({ type: 'enum', enum: CouponStatus, default: CouponStatus.ACTIVE })
  status: CouponStatus;

  @ManyToOne(() => CouponLabel, (couponLabel) => couponLabel.coupons, {
    onDelete: 'SET NULL',
    eager: true,
  })
  label: CouponLabel;

  @OneToMany(() => CouponFavourite, (couponFavourite) => couponFavourite.coupon)
  favourites: CouponFavourite[];

  @OneToOne(() => Coupon, (coupon) => coupon.coupon_usage, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  coupon_usage: CouponUsage;
}
