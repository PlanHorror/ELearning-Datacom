import React, { useState } from "react";
import {
  Card,
  Badge,
  Typography,
  Button,
  Progress,
  Divider,
  Modal,
  message,
} from "antd";
import { motion } from "framer-motion";
import {
  ClockCircleOutlined,
  GiftOutlined,
  CopyOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import Image from "next/image";
import { getImageUrl } from "@/utils/image";
import styles from "./coupon.card.module.scss";
import dayjs from "dayjs";
import { toast } from "sonner";
const { Title, Text } = Typography;

interface CouponCardProps {
  coupon: {
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
  };
  pointOfUser: number;
  onCouponClick: (coupon: CouponCardProps["coupon"]) => void;
  isFavorite?: boolean;
  onFavoriteToggle?: (couponId: string) => void;
}

const CouponCard: React.FC<CouponCardProps> = ({
  coupon,
  onCouponClick,
  pointOfUser,
  isFavorite = false,
  onFavoriteToggle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [copyLoading, setCopyLoading] = useState(false);
  const [favorite, setFavorite] = useState(isFavorite);

  const handleCopy = async () => {
    if (!coupon.use_code) return;
    setCopyLoading(true);
    try {
      await navigator.clipboard.writeText(coupon.use_code);
      toast.success("Copied coupon code!");
    } catch {
      toast.error("Failed to copy code");
    }
    setCopyLoading(false);
  };

  const handleGetCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    setModalVisible(true);
  };

  const handleConfirmExchange = () => {
    setModalVisible(false);
    onCouponClick(coupon);
  };

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorite(!favorite);
    if (onFavoriteToggle) {
      onFavoriteToggle(coupon.id);
    }
  };

  const percent = coupon.use_point
    ? Math.min(100, Math.round((pointOfUser / coupon.use_point) * 100))
    : 0;

  const progressFormat = () => {
    if (!coupon.use_point) return "";
    if (pointOfUser >= coupon.use_point) return "Ready to redeem!";
    return `${coupon.use_point - pointOfUser} points away`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Badge.Ribbon text={`${coupon.use_point} points`} color="#ff6b6b">
        <Card
          hoverable
          className={styles.couponCard}
          onClick={() => onCouponClick(coupon)}
          cover={
            <div className={styles.couponImageContainer}>
              <Image
                width={300}
                height={300}
                alt={coupon.title}
                src={getImageUrl(coupon.image)}
                className={styles.couponImage}
              />
            </div>
          }
        >
          <div className={styles.couponProvider}>
            <span>{coupon.labelId}</span>
            <Badge status="processing" text="Available" />
          </div>
          <Title level={4} className={styles.couponName}>
            {coupon.title}
          </Title>
          <div className={styles.couponExpiry}>
            <ClockCircleOutlined />
            <span>
              Expires: {dayjs(coupon.period_end).format("YYYY-MM-DD")}
            </span>
          </div>
          <Divider className={styles.couponDivider} />
          <div className={styles.pointsProgress}>
            <Progress
              percent={percent}
              strokeColor="#1a237e"
              format={progressFormat}
            />
            <Text className={styles.pointsAway}>
              {pointOfUser >= coupon.use_point
                ? "Get coupon now!"
                : `${coupon.use_point - pointOfUser} points away`}
            </Text>
          </div>
          {coupon.use_code && (
            <Button
              icon={<CopyOutlined />}
              loading={copyLoading}
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              style={{ marginBottom: 12, width: "100%" }}
            >
              Copy Code
            </Button>
          )}
          <div className={styles.couponFooter}>
            <div className={styles.couponActions}>
              <Button
                type="primary"
                icon={<GiftOutlined />}
                onClick={handleGetCoupon}
                style={{ flex: 1 }}
              >
                Get Coupon
              </Button>
              <Button
                type="text"
                icon={favorite ? <HeartFilled /> : <HeartOutlined />}
                onClick={handleFavoriteToggle}
                className={styles.favoriteButton}
                style={{
                  color: favorite ? "#ff4d4f" : "inherit",
                  marginLeft: "8px",
                }}
              />
            </div>
          </div>
        </Card>
      </Badge.Ribbon>
      <Modal
        open={modalVisible}
        title="Confirm Exchange"
        onOk={handleConfirmExchange}
        onCancel={() => setModalVisible(false)}
        okText="Exchange"
        cancelText="Cancel"
      >
        <p>Are you sure you want to exchange for this coupon?</p>
        <p>
          <b>{coupon.title}</b>
        </p>
        <p>
          It will cost <b>{coupon.use_point} points</b>.
        </p>
      </Modal>
    </motion.div>
  );
};

export default CouponCard;
