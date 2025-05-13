"use client";

import { Card, Tag, Typography } from "antd";
import { Coupon } from "../../domain/dto/coupon.dto";
import styles from "./coupon.component.module.scss";
import { GiftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface CouponCardProps {
  coupon: Coupon;
}

export const CouponCard = ({ coupon }: CouponCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success";
      case "inactive":
        return "default";
      case "expired":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Card className={styles.coupon_card} hoverable>
      <div className={styles.coupon_header}>
        <GiftOutlined className={styles.coupon_icon} />
        <Title level={4} className={styles.coupon_code}>
          {coupon.code}
        </Title>
        <Tag color={getStatusColor(coupon.status)}>{coupon.status}</Tag>
      </div>
      <div className={styles.coupon_body}>
        <Text className={styles.coupon_discount}>
          {coupon.type === "percentage"
            ? `${coupon.discount}% OFF`
            : `$${coupon.discount} OFF`}
        </Text>
        <Text className={styles.coupon_description}>{coupon.description}</Text>
        <div className={styles.coupon_dates}>
          <Text type="secondary">Valid from: {coupon.startDate}</Text>
          <Text type="secondary">to: {coupon.endDate}</Text>
        </div>
      </div>
    </Card>
  );
};
