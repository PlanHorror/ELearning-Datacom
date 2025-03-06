import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from 'src/common/enums';
import { Coupon } from 'src/coupon/entity/coupon.entity';

// Company entity class
@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  company_name: string;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  last_updated: Date;

  @Column({ nullable: true })
  last_login: Date;

  @Column({ type: 'enum', enum: Status, default: Status.INACTIVE })
  status: Status;

  @OneToMany((_type) => Coupon, (coupon) => coupon.company, { eager: true })
  coupons: Coupon[];
}
