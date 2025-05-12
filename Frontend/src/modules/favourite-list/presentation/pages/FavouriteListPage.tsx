"use client";

import React, { useEffect, useState } from "react";
import styles from "./FavouriteListPage.module.scss";
import { FavouriteListHeader } from "../components/FavouriteListHeader";
import { FavouriteCouponUseCase } from "../../domain/usecase/favourite.coupon.usecase";
import { LoadingComponent } from "@/shared/components/loading/loading.component";
import { Col, Row } from "antd";
import CouponCard from "@/shared/components/coupon-card/coupon.card.component";
import { useSession } from "next-auth/react";
import { CustomerUseCase } from "@/modules/customers/domain/usecases/customer.usecase";
import { GetCustomerByIdResponse } from "@/modules/customers/domain/dto/getCustomer.dto";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";
import { EmptyState } from "../components/EmptyState";
import { useTranslations } from "next-intl";

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

export const FavouriteListPage: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<GetCustomerByIdResponse | null>(null);

  const router = useRouter();

  const { data: session, status } = useSession();

  const favouriteCouponUseCase = new FavouriteCouponUseCase();

  const t = useTranslations();

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
    const getFavouriteCoupon = async () => {
      try {
        setIsLoading(true);
        const res = await favouriteCouponUseCase.getFavouriteCoupons();
        if (res.status === 200) {
          setCoupons(res.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getFavouriteCoupon();
  }, []);

  const handleCouponClick = (coupon: Coupon) => {
    router.push(`/coupons/${coupon.id}`);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        <div>
          <FavouriteListHeader title={t("favourite.title")} />
        </div>
        <div className={styles.page_content}>
          {coupons.length > 0 ? (
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
                    onCouponClick={handleCouponClick}
                    pointOfUser={profile?.points || 0}
                    isFavorite={true}
                    onFavoriteToggle={onFavoriteToggle}
                  />
                </Col>
              ))}
            </Row>
          ) : (
            <EmptyState description={t("favourite.empty")} />
          )}
        </div>
      </div>
    </div>
  );
};
