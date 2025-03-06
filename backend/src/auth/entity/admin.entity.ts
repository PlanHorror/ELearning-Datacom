import { CouponLabel } from 'src/coupon-label/entity/coupon-label.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

// Admin entity class
@Entity()
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany((_type) => CouponLabel, (couponLabel) => couponLabel.admin, {
    eager: true,
  })
  couponLabels: CouponLabel[];
}
