import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from 'src/common/enums';
import { CouponFavourite } from 'src/coupon-favourite/entity/coupon-favourite.entity';

// User entity class
@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column()
  postal_code: string;

  @Column()
  prefecture: string;

  @Column()
  gender: string;

  @Column()
  dob: Date;

  @Column({ default: 0 })
  points: number;

  @Column({ default: new Date() })
  created_at: Date;

  @Column({ default: new Date() })
  last_updated: Date;

  @Column({ nullable: true })
  last_login: Date;

  @Column({ type: 'enum', enum: Status, default: Status.INACTIVE })
  status: Status;

  @OneToMany((_type) => CouponFavourite, (favourite) => favourite.customer)
  favourites: CouponFavourite[];
}
