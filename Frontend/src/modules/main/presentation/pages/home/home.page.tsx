"use client";

import styles from "./home.page.module.scss";
import { useState, useEffect } from "react";
import { Button } from "@/shared/components/button/button.component";
import {
  FaGraduationCap,
  FaUsers,
  FaTicketAlt,
  FaRocket,
  FaLightbulb,
  FaGlobe,
  FaChevronDown,
  FaTrophy,
  FaStar,
  FaHeart,
  FaGift,
} from "react-icons/fa";
import { CouponService } from "@/modules/companies/services/coupon.service";
import { Tabs, Avatar, Rate, Typography, Col, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import LessonComponent from "@/modules/lessons/presentation/components/lesson.component";
import { useRouter } from "@/i18n/navigation";
import { RouterPath } from "@/shared/constants/router.const";
import { useTranslations } from "next-intl";
import CouponCard from "@/shared/components/coupon-card/coupon.card.component";

const { Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        await CouponService.getInstance().getCoupons();
      } catch (error) {
        console.error("Failed to fetch coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  const features = [
    {
      icon: <FaRocket />,
      title: t("home.features.fastLearning.title"),
      description: t("home.features.fastLearning.description"),
    },
    {
      icon: <FaLightbulb />,
      title: t("home.features.qualityContent.title"),
      description: t("home.features.qualityContent.description"),
    },
    {
      icon: <FaGlobe />,
      title: t("home.features.globalCommunity.title"),
      description: t("home.features.globalCommunity.description"),
    },
    {
      icon: <FaGift />,
      title: t("home.features.realRewards.title"),
      description: t("home.features.realRewards.description"),
    },
  ];

  const stats = [
    {
      number: "1000+",
      label: t("home.trust.stats.students"),
      icon: <FaUsers />,
    },
    {
      number: "50+",
      label: t("home.trust.stats.lectures"),
      icon: <FaGraduationCap />,
    },
    {
      number: "100+",
      label: t("home.trust.stats.coupons"),
      icon: <FaTicketAlt />,
    },
  ];

  const testimonials = [
    {
      name: "Tanaka Yuki",
      role: "Business Student",
      avatar: "/avatar1.jpg",
      comment:
        "Learning on this platform has helped me earn great rewards while improving my skills. The coupon for coffee shop was amazing!",
      rating: 5,
    },
    {
      name: "Suzuki Haruto",
      role: "IT Professional",
      avatar: "/avatar2.jpg",
      comment:
        "I earned enough points for a restaurant discount after completing just 3 courses. Highly recommended for anyone who wants to learn!",
      rating: 4,
    },
    {
      name: "Sato Aiko",
      role: "Marketing Specialist",
      avatar: "/avatar3.jpg",
      comment:
        "The quality of courses combined with the reward system makes learning so much more motivating. I&apos;ve earned multiple rewards already!",
      rating: 5,
    },
  ];

  // Sample reward items with linked courses
  const rewardItems = [
    {
      id: 1,
      name: "Starbucks ¥1000 Gift Card",
      image: "/public/Starbucks.svg",
      points: 500,
      expiry: "2023-12-31",
      linkedCourse: "Introduction to Math Secondary",
      pointsToComplete: 150,
      provider: "Starbucks Japan",
      category: "popular",
    },
    {
      id: 2,
      name: "Amazon Japan ¥2000 Voucher",
      image: "/public/slider/slider_2.jpg",
      points: 1000,
      expiry: "2023-12-15",
      linkedCourse: "Advanced Web Development",
      pointsToComplete: 300,
      provider: "Amazon Japan",
      category: "new",
    },
    {
      id: 3,
      name: "UNIQLO ¥1500 Discount",
      image: "/public/slider/slider_3.jpg",
      points: 750,
      expiry: "2023-11-30",
      linkedCourse: "Japanese Primary",
      pointsToComplete: 200,
      provider: "UNIQLO Japan",
      category: "popular",
    },
    {
      id: 4,
      name: "Toshiba 10% Discount",
      image: "/public/slider/slider_1.jpg",
      points: 250,
      expiry: "2023-12-31",
      linkedCourse: "Introduction to History Of Japan",
      pointsToComplete: 100,
      provider: "Toshiba",
      category: "recommended",
    },
    {
      id: 5,
      name: "Datacom Points (500pts)",
      image: "/public/slider/slider_2.jpg",
      points: 600,
      expiry: "2023-12-31",
      linkedCourse: "Physical High School",
      pointsToComplete: 180,
      provider: "Datacom",
      category: "new",
    },
    {
      id: 6,
      name: "Vin Group 10% Discount",
      image: "/public/slider/slider_3.jpg",
      points: 800,
      expiry: "2023-11-30",
      linkedCourse: "English Conversation Skills",
      pointsToComplete: 250,
      provider: "Vin Group",
      category: "recommended",
    },
  ];

  const filteredRewards = rewardItems.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  const handleStartLearning = () => {
    router.push(RouterPath.SIGNIN);
  };

  const handleExploreRewards = () => {
    const rewardsSection = document.getElementById("rewards-section");
    if (rewardsSection) {
      rewardsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        {/* 1. Hero Section */}
        <motion.div
          className={styles.hero_section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.hero_content}>
            <motion.h1
              className={styles.hero_title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              {t("home.hero.title")}
            </motion.h1>
            <motion.p
              className={styles.hero_description}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              {t("home.hero.description")}
            </motion.p>
            <motion.div
              className={styles.hero_buttons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                className={styles.primary_button}
                name={t("home.hero.startLearning")}
                onClick={handleStartLearning}
              />
              <Button
                className={styles.secondary_button}
                name={t("home.hero.exploreRewards")}
                onClick={handleExploreRewards}
              />
            </motion.div>
            <motion.div
              className={styles.scroll_hint}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <p>{t("home.hero.scrollHint")}</p>
              <FaChevronDown className={styles.chevron_icon} />
            </motion.div>
          </div>

          <motion.div
            className={styles.features_grid}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className={styles.feature_card}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.feature_icon}>{feature.icon}</div>
                <h3 className={styles.feature_title}>{feature.title}</h3>
                <p className={styles.feature_description}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 2. Incentive Display Section */}
        <motion.div
          id="rewards-section"
          className={styles.rewards_section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className={styles.rewards_header}>
            <h2 className={styles.rewards_title}>{t("home.rewards.title")}</h2>
            <p className={styles.rewards_subtitle}>
              {t("home.rewards.subtitle")}
            </p>
          </div>

          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className={styles.rewards_tabs}
          >
            <TabPane
              tab={
                <span>
                  <FaStar /> {t("home.rewards.tabs.popular")}
                </span>
              }
              key="popular"
            />
            <TabPane
              tab={
                <span>
                  <FaGift /> {t("home.rewards.tabs.new")}
                </span>
              }
              key="new"
            />
            <TabPane
              tab={
                <span>
                  <FaHeart /> {t("home.rewards.tabs.recommended")}
                </span>
              }
              key="recommended"
            />
            <TabPane
              tab={
                <span>
                  <FaGlobe /> {t("home.rewards.tabs.all")}
                </span>
              }
              key="all"
            />
          </Tabs>

          <div className={styles.rewards_grid}>
            <Row gutter={[24, 24]}>
              {filteredRewards.map((reward) => (
                <Col xs={24} sm={12} md={8} lg={6} key={reward.id}>
                  <CouponCard
                    coupon={{
                      id: reward.id.toString(),
                      title: reward.name,
                      image: reward.image,
                      use_point: reward.points,
                      period_end: reward.expiry,
                      pointsToComplete: reward.pointsToComplete,
                    }}
                    onCouponClick={(coupon) => {
                      // Handle coupon click - you can add navigation or other actions here
                      console.log("Coupon clicked:", coupon);
                    }}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </motion.div>

        {/* Rest of the content */}
        <div className={styles.body_wrapper}>
          {/* 4. Trust & Motivation Section */}
          <div className={styles.trust_section}>
            <h2 className={styles.section_title}>{t("home.trust.title")}</h2>
            <p className={styles.section_description}>
              {t("home.trust.description")}
            </p>

            <div className={styles.testimonials_container}>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className={styles.testimonial_card}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={styles.testimonial_header}>
                    <Avatar
                      size={64}
                      style={{ backgroundColor: "#87d068" }}
                      icon={<UserOutlined />}
                    />
                    <div className={styles.testimonial_author}>
                      <Text strong>{testimonial.name}</Text>
                      <Text type="secondary">{testimonial.role}</Text>
                      <Rate disabled defaultValue={testimonial.rating} />
                    </div>
                  </div>
                  <Paragraph className={styles.testimonial_content}>
                    &quot;{testimonial.comment}&quot;
                  </Paragraph>
                </motion.div>
              ))}
            </div>

            <div className={styles.stats_wrapper}>
              <h3 className={styles.stats_title}>
                {t("home.trust.stats.title")}
              </h3>
              <div className={styles.stats_grid}>
                {stats.map((stat, index) => (
                  <div key={index} className={styles.stat_card}>
                    <div className={styles.stat_icon}>{stat.icon}</div>
                    <div className={styles.stat_number}>{stat.number}</div>
                    <div className={styles.stat_label}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.recent_activity}>
              <h3 className={styles.activity_title}>
                {t("home.trust.activity.title")}
              </h3>
              <div className={styles.activity_list}>
                <div className={styles.activity_item}>
                  <FaTrophy className={styles.activity_icon} />
                  <div className={styles.activity_content}>
                    <Text strong>
                      {t("home.trust.activity.earnedCoupon", {
                        name: "Tanaka S.",
                        coupon: "Starbucks",
                      })}
                    </Text>
                    <Text type="secondary">
                      {t("home.trust.activity.timeAgo.hours", { count: 2 })}
                    </Text>
                  </div>
                </div>
                <div className={styles.activity_item}>
                  <FaGraduationCap className={styles.activity_icon} />
                  <div className={styles.activity_content}>
                    <Text strong>
                      {t("home.trust.activity.completedCourse", {
                        name: "Yamada K.",
                        course: "Business English",
                      })}
                    </Text>
                    <Text type="secondary">
                      {t("home.trust.activity.timeAgo.hours", { count: 4 })}
                    </Text>
                  </div>
                </div>
                <div className={styles.activity_item}>
                  <FaGift className={styles.activity_icon} />
                  <div className={styles.activity_content}>
                    <Text strong>
                      {t("home.trust.activity.redeemedVoucher", {
                        name: "Suzuki H.",
                        voucher: "Amazon Japan",
                      })}
                    </Text>
                    <Text type="secondary">
                      {t("home.trust.activity.timeAgo.yesterday")}
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.lesson_wrapper}>
            <h2 className={styles.title}>{t("home.lessons.title")}</h2>
            <LessonComponent />
          </div>

          {/* Sponsors Section */}
          <div className={styles.sponsors_section}>
            <h2 className={styles.section_title}>
              {/* {t("home.sponsors.title") || "Our Sponsors"} */}
              Company
            </h2>
            <p className={styles.section_description}>
              {/* {t("home.sponsors.description") || */}
              These trusted businesses provide special discounts and coupons for
              our learners.
            </p>

            <div className={styles.sponsors_grid}>
              <div className={styles.sponsor_card}>
                <div className={styles.sponsor_logo}>
                  <FaGift className={styles.placeholder_logo} />
                </div>
                <h3 className={styles.sponsor_name}>Starbucks Japan</h3>
                <p className={styles.sponsor_description}>
                  Offering coffee discount coupons for our top learners.
                </p>
              </div>

              <div className={styles.sponsor_card}>
                <div className={styles.sponsor_logo}>
                  <FaGift className={styles.placeholder_logo} />
                </div>
                <h3 className={styles.sponsor_name}>Amazon Japan</h3>
                <p className={styles.sponsor_description}>
                  Providing shopping vouchers for course completions.
                </p>
              </div>

              <div className={styles.sponsor_card}>
                <div className={styles.sponsor_logo}>
                  <FaGift className={styles.placeholder_logo} />
                </div>
                <h3 className={styles.sponsor_name}>UNIQLO</h3>
                <p className={styles.sponsor_description}>
                  Special discounts for students who complete our courses.
                </p>
              </div>

              <div className={styles.sponsor_card}>
                <div className={styles.sponsor_logo}>
                  <FaGift className={styles.placeholder_logo} />
                </div>
                <h3 className={styles.sponsor_name}>Toshiba</h3>
                <p className={styles.sponsor_description}>
                  Tech discounts for students in IT-related courses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
