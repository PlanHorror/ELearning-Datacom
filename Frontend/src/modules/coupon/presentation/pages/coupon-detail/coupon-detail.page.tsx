"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Tag,
  Spin,
  Alert,
  Badge,
  Divider,
  Progress,
  Row,
  Col,
} from "antd";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ClockCircleOutlined,
  GiftOutlined,
  FireOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import styles from "./coupon-detail.page.module.scss";
import { CouponUseCase } from "@/modules/coupon/domain/usecase/coupon.usecase";
import Image from "next/image";
import { getImageUrl } from "@/utils/image";

const { Title, Text, Paragraph } = Typography;

interface Coupon {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  discount: number;
  labelId?: string;
  points: number;
  expiry: string;
  provider: string;
  pointsToComplete: number;
}

const CouponDetailPage: React.FC = () => {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const couponUseCase = new CouponUseCase();

  useEffect(() => {
    const fetchCouponDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const couponId = window.location.pathname.split("/").pop();
        if (!couponId) {
          throw new Error("Coupon ID not found");
        }

        const response = await couponUseCase.getCouponById(couponId);
        if (response) {
          setCoupon(response);
        } else {
          setError("Coupon not found");
        }
      } catch (error) {
        console.error("Error fetching coupon details:", error);
        setError("Failed to load coupon details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCouponDetails();
  }, []);

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (error || !coupon) {
    return (
      <div className={styles.errorContainer}>
        <Alert
          message="Error"
          description={error || "Coupon not found"}
          type="error"
          showIcon
        />
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={handleBack}
          className={styles.backButton}
        >
          Back to Coupons
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={handleBack}
            className={styles.backButton}
          >
            Back to Coupons
          </Button>
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Row gutter={[48, 48]}>
            <Col xs={24} md={12}>
              <div className={styles.imageContainer}>
                <Image
                  width={600}
                  height={400}
                  alt={coupon.title}
                  src={getImageUrl(coupon.imageUrl)}
                  className={styles.couponImage}
                />
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.detailsContainer}>
                <div className={styles.header}>
                  <div className={styles.titleContainer}>
                    <Title level={2}>{coupon.title}</Title>
                    <Tag color="blue" className={styles.discountTag}>
                      {coupon.discount}% OFF
                    </Tag>
                  </div>
                  <div className={styles.provider}>
                    <span>{coupon.provider}</span>
                    <Badge status="processing" text="Available" />
                  </div>
                </div>

                <Paragraph className={styles.description}>
                  {coupon.description}
                </Paragraph>

                <Divider />

                <div className={styles.details}>
                  <div className={styles.detailItem}>
                    <ClockCircleOutlined />
                    <span>
                      Expires: {new Date(coupon.expiry).toLocaleDateString()}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <GiftOutlined />
                    <span>Points Required: {coupon.points}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <FireOutlined />
                    <span>Provider: {coupon.provider}</span>
                  </div>
                </div>

                <div className={styles.progressSection}>
                  <Progress
                    percent={30}
                    strokeColor="#1a237e"
                    format={() => `${coupon.pointsToComplete} points needed`}
                  />
                  <Text className={styles.pointsAway}>
                    {coupon.pointsToComplete - 75} points away from getting this
                    coupon
                  </Text>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<GiftOutlined />}
                  className={styles.getCouponButton}
                >
                  Get This Coupon
                </Button>
              </div>
            </Col>
          </Row>
        </motion.div>
      </div>
    </div>
  );
};

export default CouponDetailPage;
