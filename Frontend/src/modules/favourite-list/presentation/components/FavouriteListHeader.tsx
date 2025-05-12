import React from "react";
import styles from "./FavouriteListHeader.module.scss";

export const FavouriteListHeader: React.FC = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Danh sách coupon yêu thích</h1>
      <p className={styles.description}>
        Khám phá và quản lý những coupon bạn đã lưu lại
      </p>
    </div>
  );
};
