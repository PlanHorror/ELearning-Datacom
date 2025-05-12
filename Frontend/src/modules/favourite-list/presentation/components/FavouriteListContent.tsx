import React from "react";
import styles from "./FavouriteListContent.module.scss";
import CouponCard from "@/shared/components/coupon-card/coupon.card.component";
import { toast } from "sonner";

interface Coupon {
  id: string;
  title: string;
  period_start?: Date;
  period_end: Date;
  classification?: string;
  use_point: number;
  use_code?: string;
  image: string;
  comment?: string;
  status: string;
  labelId?: string;
  detail?: string;
}

export const FavouriteListContent: React.FC = () => {
  // This would typically come from your data source
  const favoriteCoupons: Coupon[] = [
    {
      id: "1",
      title: "Giảm giá 50% cho khóa học",
      period_end: new Date("2024-12-31"),
      use_point: 100,
      use_code: "WELCOME50",
      image: "/images/coupon-sample.jpg",
      status: "active",
      labelId: "Khóa học",
    },
    // Add more sample coupons here
  ];

  const handleCouponClick = (coupon: Coupon) => {
    toast.info(`Selected coupon: ${coupon.title}`);
  };

  const handleFavoriteToggle = (couponId: string) => {
    toast.success(`Coupon ${couponId} removed from favorites`);
  };

  return (
    <div className={styles.content}>
      {favoriteCoupons.length > 0 ? (
        <div className={styles.couponGrid}>
          {favoriteCoupons.map((coupon) => (
            <CouponCard
              key={coupon.id}
              coupon={coupon}
              pointOfUser={500} // This should come from your user context/state
              onCouponClick={handleCouponClick}
              isFavorite={true}
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p>Bạn chưa có coupon yêu thích nào</p>
        </div>
      )}
    </div>
  );
};
