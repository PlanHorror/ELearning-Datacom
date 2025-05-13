import React from "react";
import styles from "./CouponCard.module.scss";

interface CouponCardProps {
  id: string;
  title: string;
  discount: string;
  expiryDate: string;
  code: string;
}

export const CouponCard: React.FC<CouponCardProps> = ({
  title,
  discount,
  expiryDate,
  code,
}) => {
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className={styles.couponCard}>
      <div className={styles.couponHeader}>
        <h3 className={styles.couponTitle}>{title}</h3>
        <span className={styles.discount}>{discount}</span>
      </div>
      <div className={styles.couponDetails}>
        <p className={styles.expiryDate}>Hết hạn: {expiryDate}</p>
        <div className={styles.codeContainer}>
          <span className={styles.code}>{code}</span>
          <button className={styles.copyButton} onClick={handleCopyCode}>
            Sao chép
          </button>
        </div>
      </div>
    </div>
  );
};
