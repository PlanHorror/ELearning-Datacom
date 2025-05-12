"use client";

import { Card, Col, Row, Progress, Tooltip, Badge } from "antd";
import styles from "./profile.component.module.scss";
import UserIconComponent from "@/shared/icons/user-icon/user.icon.component";
import {
  EditOutlined,
  MailOutlined,
  RiseOutlined,
  TrophyOutlined,
  GiftOutlined,
  StarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useSession } from "next-auth/react";
import {
  Calendar,
  Code,
  Medal,
  Tickets,
  VenusAndMars,
  Award,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { useEffect, useState } from "react";
import ModalUpdateInformation from "../modal-update-information/modal.update.information.component";
import { CustomerUseCase } from "@/modules/customers/domain/usecases/customer.usecase";
import { CouponUseCase } from "@/modules/coupons/domain/usecase/coupon.usecase";
import { toast } from "sonner";
import { GetCustomerByIdResponse } from "../../../domain/dto/getCustomer.dto";
import { LoadingComponent } from "@/shared/components/loading/loading.component";
import dayjs from "dayjs";
import CouponUsageCard from "@/shared/components/coupon-usage-card/coupon-usage.card.component";
import { useTranslations } from "next-intl";

type CouponUsage = {
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

const ProfileComponent = () => {
  const t = useTranslations();
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState<GetCustomerByIdResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usedCoupons, setUsedCoupons] = useState<CouponUsage[]>([]);

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

  const fetchUsedCoupons = async () => {
    try {
      const couponUseCase = new CouponUseCase();
      const res = await couponUseCase.getUsedCoupons();
      if (res.status === 200) {
        setUsedCoupons(res.data);
      }
    } catch (error) {
      console.error("Error fetching used coupons:", error);
    }
  };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetchProfile();
      fetchUsedCoupons();
    }
  }, [status]);

  const handleProfileUpdate = async () => {
    await fetchProfile();
  };

  if (status === "loading" || isLoading) {
    return <LoadingComponent />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCouponClick = (coupon: CouponUsage) => {
    console.log("Coupon clicked:", coupon);
  };

  const handleFavoriteToggle = (couponId: string) => {
    console.log("Favorite toggled for coupon:", couponId);
  };

  const achievements = [
    {
      icon: <TrophyOutlined />,
      title: "First Course",
      description: "Completed your first course",
      progress: 100,
    },
    {
      icon: <StarOutlined />,
      title: "Fast Learner",
      description: "Completed 5 courses in a month",
      progress: 60,
    },
    {
      icon: <GiftOutlined />,
      title: "Point Collector",
      description: "Earned 1000 points",
      progress: 75,
    },
  ];

  const recentActivities = [
    {
      icon: <BookOpen size={20} />,
      title: "Started new course",
      description: "Introduction to Programming",
      time: "2 hours ago",
    },
    {
      icon: <GraduationCap size={20} />,
      title: "Course completed",
      description: "Web Development Basics",
      time: "1 day ago",
    },
    {
      icon: <Award size={20} />,
      title: "Achievement unlocked",
      description: "Fast Learner",
      time: "2 days ago",
    },
  ];

  return (
    <div className={styles.component_container}>
      <Row className={styles.component_wrapper} gutter={[30, 20]}>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={8}
          xl={8}
          xxl={8}
          className={styles.left_col}
        >
          <Card hoverable={true}>
            <div className={styles.card_wrapper}>
              <div className={styles.title_wrapper}>
                <UserIconComponent
                  username={profile?.username || ""}
                  role={session?.user?.role || ""}
                />
                <EditOutlined onClick={showModal} />
              </div>
              <div className={styles.user_wrapper}>
                <p className={styles.user_username}>{profile?.username}</p>
                <p className={styles.user_role}>@{session?.user?.role}</p>
                <div className={styles.user_stats}>
                  <Tooltip title="Member since">
                    <span>
                      <ClockCircleOutlined />{" "}
                      {dayjs(profile?.createdAt).format("MMM YYYY")}
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Card>
          <Card hoverable={true}>
            <div className={styles.card_wrapper}>
              <div className={styles.title_wrapper}>
                <h2>{t("profile.personalInfo")}</h2>
                <EditOutlined onClick={showModal} />
              </div>
              <div className={styles.information_wrapper}>
                <div className={styles.information}>
                  <MailOutlined />
                  <p>{profile?.email}</p>
                </div>
                <div className={styles.information}>
                  <Code size={15} />
                  <p>{profile?.postal_code}</p>
                </div>
                <div className={styles.information}>
                  <VenusAndMars size={15} />
                  <p>{profile?.gender}</p>
                </div>
                <div className={styles.information}>
                  <Calendar size={15} />
                  <p>{dayjs(profile?.dob).format("YYYY/MM/DD")}</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={16}
          xl={16}
          xxl={16}
          className={styles.right_col}
        >
          <Card hoverable={true}>
            <div className={styles.right_card_wrapper}>
              <RiseOutlined />
              <div className={styles.progress_info}>
                <p className={styles.text}>{t("profile.learningProgress")}</p>
                <Progress percent={65} status="active" />
                <span className={styles.progress_text}>
                  12 {t("profile.coursesCompleted")}
                </span>
              </div>
            </div>
          </Card>
          <Card hoverable={true}>
            <div className={styles.right_card_wrapper}>
              <Medal size={24} />
              <div className={styles.points_info}>
                <p className={styles.text}>{t("profile.points")}</p>
                <span className={styles.points_value}>{profile?.points}</span>
                {/* <Badge count="+100" style={{ backgroundColor: "#52c41a" }} /> */}
              </div>
            </div>
          </Card>
          <Card hoverable={true}>
            <div className={styles.right_card_wrapper}>
              <Tickets size={24} />
              <div className={styles.coupons_info}>
                <p className={styles.text}>{t("profile.availableCoupons")}</p>
                <span className={styles.coupons_count}>
                  {profile?.available_coupons || 0}
                </span>
                {(profile?.available_coupons ?? 0) > 0 && (
                  <Badge count="New" style={{ backgroundColor: "#1890ff" }} />
                )}
              </div>
            </div>
          </Card>
          <Card
            hoverable={true}
            title={t("profile.couponUsageHistory")}
            className={styles.ant_card}
            headStyle={{
              borderBottom: "1px solid #f0f0f0",
              padding: "16px 24px",
            }}
            bodyStyle={{ padding: "24px" }}
          >
            <div className={styles.coupons_grid}>
              {usedCoupons.map((usage) => (
                <CouponUsageCard key={usage.id} coupon={usage} />
              ))}
              {usedCoupons.length === 0 && (
                <div className={styles.no_data}>
                  {t("profile.noCouponUsageHistory")}
                </div>
              )}
            </div>
          </Card>
          <Card
            hoverable={true}
            title={t("profile.recentActivities")}
            className={styles.ant_card}
            headStyle={{
              borderBottom: "1px solid #f0f0f0",
              padding: "16px 24px",
            }}
            bodyStyle={{ padding: "24px" }}
          >
            <div className={styles.activities_wrapper}>
              {recentActivities.map((activity, index) => (
                <div key={index} className={styles.activity_item}>
                  <div className={styles.activity_icon}>{activity.icon}</div>
                  <div className={styles.activity_content}>
                    <p className={styles.activity_title}>{activity.title}</p>
                    <p className={styles.activity_description}>
                      {activity.description}
                    </p>
                    <span className={styles.activity_time}>
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card
            hoverable={true}
            title="Achievements"
            className={styles.ant_card}
            headStyle={{
              borderBottom: "1px solid #f0f0f0",
              padding: "16px 24px",
            }}
            bodyStyle={{ padding: "24px" }}
          >
            <div className={styles.achievements_wrapper}>
              {achievements.map((achievement, index) => (
                <div key={index} className={styles.achievement_item}>
                  <div className={styles.achievement_icon}>
                    {achievement.icon}
                  </div>
                  <div className={styles.achievement_content}>
                    <p className={styles.achievement_title}>
                      {achievement.title}
                    </p>
                    <p className={styles.achievement_description}>
                      {achievement.description}
                    </p>
                    <Progress percent={achievement.progress} size="small" />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
      <ModalUpdateInformation
        isShowModal={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />
    </div>
  );
};

export default ProfileComponent;
