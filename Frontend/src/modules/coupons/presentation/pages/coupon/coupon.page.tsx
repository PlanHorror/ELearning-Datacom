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
import { motion } from "framer-motion";
import { HeartOutlined, FireOutlined, StarOutlined } from "@ant-design/icons";
import styles from "./coupon.page.module.scss";
import { CouponUseCase } from "@/modules/coupons/domain/usecase/coupon.usecase";
import CouponCard, {
  CouponCardProps,
} from "@/shared/components/coupon-card/coupon.card.component";
import { GetCustomerByIdResponse } from "@/modules/customers/domain/dto/getCustomer.dto";
import { toast } from "sonner";
import { CustomerUseCase } from "@/modules/customers/domain/usecases/customer.usecase";
import { useSession } from "next-auth/react";
import { FavouriteCouponUseCase } from "@/modules/favourite-list/domain/usecase/favourite.coupon.usecase";
import { FilterCouponDto } from "@/modules/coupons/domain/dto/coupon.dto";
import { CouponStatus } from "@/shared/constants/coupon.status";

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
  comment?: string;
  status: string;
  labelId?: string;
  detail?: string;
  isFavorite?: boolean;
  isUsed?: boolean;
}

interface Label {
  id: string;
  name: string;
}

interface FavoriteCouponResponse {
  id: string;
  couponId: string;
}

const CouponPage: React.FC = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState("all");
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [labels, setLabels] = useState<Label[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<GetCustomerByIdResponse | null>(null);
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [usedCoupons, setUsedCoupons] = useState<string[]>([]);

  const router = useRouter();
  const couponUseCase = new CouponUseCase();
  const favouriteCouponUseCase = new FavouriteCouponUseCase();

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

  useEffect(() => {
    const fetchFavoriteCoupons = async () => {
      if (status !== "authenticated" || !session?.user) return;

      try {
        const response = await favouriteCouponUseCase.getFavouriteCoupons();
        console.log("Favorite coupons response:", response);

        if (response.status === 200 && Array.isArray(response.data)) {
          const favoriteIds = response.data.map(
            (item: FavoriteCouponResponse) => item.couponId || item.id
          );
          console.log("Favorite coupon IDs:", favoriteIds);
          setFavoriteList(favoriteIds);
        }
      } catch (error) {
        console.error("Error fetching favorite coupons:", error);
      }
    };

    fetchFavoriteCoupons();
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

  useEffect(() => {
    const fetchUsedCoupons = async () => {
      if (status !== "authenticated" || !session?.user) return;

      try {
        const response = await couponUseCase.getUsedCoupons();
        if (response.status === 200 && Array.isArray(response.data)) {
          const usedCouponIds = response.data.map(
            (item) => item.couponId || item.id
          );
          setUsedCoupons(usedCouponIds);
        }
      } catch (error: unknown) {
        console.error("Error fetching used coupons:", error);
      }
    };

    fetchUsedCoupons();
  }, [status]);

  useEffect(() => {
    const fetchCoupons = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const filter: FilterCouponDto = {
          status: CouponStatus.ACTIVE,
        };

        if (activeTab !== "all") {
          const selectedLabel = labels.find((label) => label.id === activeTab);
          if (selectedLabel) {
            filter.labelId = selectedLabel.id;
          }
        }

        const response = await couponUseCase.getCouponByFiller(filter);
        if (response && Array.isArray(response)) {
          const couponsWithStatus = response.map((coupon) => {
            const isFavorited = favoriteList.includes(coupon.id);
            const isUsed = usedCoupons.includes(coupon.id);
            return {
              ...coupon,
              isFavorite: isFavorited,
              isUsed: isUsed,
            };
          });
          setCoupons(couponsWithStatus);
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

    if (favoriteList !== undefined) {
      fetchCoupons();
    }
  }, [activeTab, favoriteList, refreshTrigger, usedCoupons]);

  const onFavoriteToggle = async (couponId: string) => {
    const coupon = coupons.find((c) => c.id === couponId);
    const isFavorited = coupon?.isFavorite || favoriteList.includes(couponId);

    console.log(
      "Toggle favorite for coupon:",
      couponId,
      "Current status:",
      isFavorited
    );

    try {
      if (isFavorited) {
        console.log("Attempting to remove from favorites");
        const res = await favouriteCouponUseCase.deleteFavouriteCoupon({
          id: couponId,
        });

        if (res.status === 200) {
          setFavoriteList((prev) => prev.filter((id) => id !== couponId));
          setCoupons((prevCoupons) =>
            prevCoupons.map((coupon) =>
              coupon.id === couponId ? { ...coupon, isFavorite: false } : coupon
            )
          );

          toast.success("Coupon removed from favourite list!");
        }
      } else {
        console.log("Attempting to add to favorites");
        const res = await favouriteCouponUseCase.addFavouriteCoupons({
          id: couponId,
        });

        if (res.status === 200) {
          setFavoriteList((prev) => [...prev, couponId]);
          setCoupons((prevCoupons) =>
            prevCoupons.map((coupon) =>
              coupon.id === couponId ? { ...coupon, isFavorite: true } : coupon
            )
          );

          toast.success("Coupon added to favourite list!");
        }
      }
    } catch (error: any) {
      console.error("Error toggling favorite:", error, error.response);

      if (error.response?.status === 409) {
        if (!isFavorited) {
          setFavoriteList((prev) => [...prev, couponId]);
          setCoupons((prevCoupons) =>
            prevCoupons.map((coupon) =>
              coupon.id === couponId ? { ...coupon, isFavorite: true } : coupon
            )
          );
          toast.info("This coupon is already in your favorites");
        } else {
          toast.error("Could not update favorite status. Please try again.");
        }
      } else {
        toast.error("Failed to update favorite status");
      }
    }
  };

  const handleExchangeCoupon = async (coupon: CouponCardProps["coupon"]) => {
    try {
      if (usedCoupons.includes(coupon.id)) {
        toast.error("This coupon has already been used");
        return;
      }

      if (!profile || profile.points < coupon.use_point) {
        toast.error("Not enough points to exchange this coupon");
        return;
      }

      const response = await couponUseCase.redeemCoupon(coupon.id);
      if (response.status === 200) {
        toast.success("Successfully exchanged coupon!");

        if (profile) {
          setProfile({
            ...profile,
            points: profile.points - coupon.use_point,
          });
        }

        setUsedCoupons((prev) => [...prev, coupon.id]);

        setCoupons((prevCoupons) =>
          prevCoupons.map((c) =>
            c.id === coupon.id ? { ...c, status: "USED", isUsed: true } : c
          )
        );
        setRefreshTrigger((prev) => prev + 1);
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      if (err?.response?.data?.message === "This coupon is already used") {
        toast.error("This coupon has already been used");
        setUsedCoupons((prev) => [...prev, coupon.id]);
        setCoupons((prevCoupons) =>
          prevCoupons.map((c) =>
            c.id === coupon.id ? { ...c, status: "USED", isUsed: true } : c
          )
        );
      } else {
        console.error("Error exchanging coupon:", error);
        toast.error("Failed to exchange coupon. Please try again.");
      }
    }
  };

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
              onFavoriteToggle={() => onFavoriteToggle(coupon.id)}
              onExchangeCoupon={handleExchangeCoupon}
              pointOfUser={profile?.points || 0}
              isFavorite={coupon.isFavorite}
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
