"use client";

import { Card, Badge, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import styles from "./coupon-usage.card.module.scss";
import dayjs from "dayjs";

const { Title, Text } = Typography;

export interface CouponUsageCardProps {
  coupon: {
    id: string;
    title: string;
    period_end: Date | string;
    use_point: number;
    image: string;
    status: string;
    used_at?: string;
  };
}

const CouponUsageCard: React.FC<CouponUsageCardProps> = ({ coupon }) => {
  return (
    <Card hoverable className={styles.couponUsageCard}>
      <div className={styles.couponImageContainer}>
        {coupon.image && (
          <Image
            width={300}
            height={150}
            alt={coupon.title}
            src={coupon.image}
            className={styles.couponImage}
          />
        )}
      </div>
      <Title level={4} className={styles.couponName}>
        {coupon.title}
      </Title>
      <div className={styles.couponExpiry}>
        <ClockCircleOutlined />
        <span>Expires: {dayjs(coupon.period_end).format("YYYY-MM-DD")}</span>
      </div>
      <div className={styles.couponInfoRow}>
        <Text type="secondary">Used at: </Text>
        <Text>
          {coupon.used_at
            ? dayjs(coupon.used_at).format("YYYY-MM-DD HH:mm")
            : "--"}
        </Text>
      </div>
      <div className={styles.couponInfoRow}>
        <Text type="secondary">Points used: </Text>
        <Text>{coupon.use_point}</Text>
      </div>
      <div className={styles.couponInfoRow}>
        <Badge
          status={coupon.status === "used" ? "success" : "default"}
          text={coupon.status === "used" ? "Used" : coupon.status}
        />
      </div>
    </Card>
  );
};

export default CouponUsageCard;
