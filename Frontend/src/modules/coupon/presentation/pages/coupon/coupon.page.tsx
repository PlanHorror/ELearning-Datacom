"use client";

import React, { useEffect, useState } from "react";
import {
  Tabs,
  Row,
  Col,
  // Typography,
  Spin,
  Empty,
  Alert,
} from "antd";
import { useRouter } from "next/navigation";
import { FilterCouponDto } from "../../../domain/dto/coupon.dto";
import { CouponStatus } from "@/shared/constants/coupon.status";
import { motion } from "framer-motion";
import { HeartOutlined, FireOutlined, StarOutlined } from "@ant-design/icons";
import styles from "./coupon.page.module.scss";
import { CouponUseCase } from "@/modules/coupon/domain/usecase/coupon.usecase";
import CouponCard from "@/shared/components/coupon-card/coupon.card.component";
import { GetCustomerByIdResponse } from "@/modules/customers/domain/dto/getCustomer.dto";
import { toast } from "sonner";
import { CustomerUseCase } from "@/modules/customers/domain/usecases/customer.usecase";
import { useSession } from "next-auth/react";

// const { Title, Text } = Typography;

interface Coupon {
  id: string;
  title: string;
  period_start?: Date;
  period_end: Date;
  classification?: string;
  use_point: number;
  use_code?: string;
  image: string;
  comment: string;
  status: string;
  labelId: string;
  detail: string;
}

interface Label {
  id: string;
  name: string;
}

const CouponPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("all");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<GetCustomerByIdResponse | null>(null);
  const router = useRouter();
  const couponUseCase = new CouponUseCase();

  useEffect(() => {
    if (session?.user?.role === "Company") {
      return;
    }
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const customerUseCase = new CustomerUseCase();
        const res = await customerUseCase.getCustomerById();
        if (res.status === 200) {
          setProfile(res.data);
        } else {
          toast.error("Get customer profile failed!");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Get customer profile failed!");
      } finally {
        setIsLoading(false);
      }
    };
    if (status === "authenticated" && session?.user) {
      fetchProfile();
    }
  }, [status]);
  // Fetch labels
  useEffect(() => {
    const fetchLabels = async () => {
      try {
        const popularLabel = await couponUseCase.getLabel("", "Popular");
        const newLabel = await couponUseCase.getLabel("", "New");

        const validLabels = [
          { id: "all", name: "All" },
          ...(popularLabel
            ? [{ id: popularLabel.id, name: popularLabel.name }]
            : []),
          ...(newLabel?.data ? [{ id: newLabel.id, name: newLabel.name }] : []),
        ];

        if (validLabels.length === 0) {
          setError("No labels available");
          return;
        }

        setLabels(validLabels);
      } catch (error) {
        console.error("Error fetching labels:", error);
        setError("Failed to load labels. Please try again later.");
      }
    };

    fetchLabels();
  }, []);

  // Fetch coupons
  useEffect(() => {
    const fetchCoupons = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const filter: FilterCouponDto = {
          status: CouponStatus.ACTIVE,
        };

        // Only add labelId filter if not "All" tab
        if (activeTab !== "all") {
          const selectedLabel = labels.find((label) => label.id === activeTab);
          if (selectedLabel) {
            filter.labelId = selectedLabel.id;
          }
        }

        const response = await couponUseCase.getAllCoupons(filter);
        if (response && Array.isArray(response)) {
          setCoupons(response);
        } else {
          setCoupons([]);
          setError("No coupons available");
        }
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setError("Failed to load coupons. Please try again later.");
        setCoupons([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (labels.length > 0) {
      fetchCoupons();
    }
  }, [activeTab, labels]);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  const handleCouponClick = (coupon: Coupon) => {
    router.push(`/coupons/${coupon.id}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
        </div>
      );
    }

    if (error) {
      return (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className={styles.alert}
        />
      );
    }

    if (coupons.length === 0) {
      return (
        <Empty
          description="No coupons available at the moment"
          className={styles.empty}
        />
      );
    }

    return (
      <Row gutter={[24, 24]}>
        {coupons.map((coupon) => (
          <Col xs={24} sm={12} md={8} lg={6} key={coupon.id}>
            <CouponCard
              coupon={{
                id: coupon.id,
                title: coupon.title,
                period_start: coupon.period_start,
                period_end: coupon.period_end,
                classification: coupon.classification,
                use_point: coupon.use_point,
                use_code: coupon.use_code,
                image: coupon.image,
                comment: coupon.comment ? coupon.comment : "",
                status: coupon.status,
                labelId: coupon.labelId,
                detail: coupon.detail,
              }}
              onCouponClick={(c) => handleCouponClick(c)}
              pointOfUser={profile?.points || 0}
            />
          </Col>
        ))}
      </Row>
    );
  };

  const renderTabLabel = (icon: React.ReactNode, text: string) => (
    <span className={styles.tabItem}>
      <span className={styles.tabIcon}>{icon}</span>
      {text}
    </span>
  );

  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        <motion.div
          className={styles.title_page_wrapper}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className={styles.sub_title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Exclusive Rewards
          </motion.p>
          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover Amazing Deals
          </motion.h1>
          <motion.p
            className={styles.title_description}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Earn points by learning and redeem them for exclusive discounts
          </motion.p>
        </motion.div>

        <div className={styles.component_container}>
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            className={styles.tabs}
            items={[
              {
                key: "all",
                label: renderTabLabel(<StarOutlined />, "All"),
              },
              {
                key: labels.find((l) => l.name === "Popular")?.id || "popular",
                label: renderTabLabel(<FireOutlined />, "Popular"),
              },
              {
                key: labels.find((l) => l.name === "New")?.id || "new",
                label: renderTabLabel(<HeartOutlined />, "New"),
              },
            ]}
          />

          <div className={styles.content}>{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default CouponPage;
