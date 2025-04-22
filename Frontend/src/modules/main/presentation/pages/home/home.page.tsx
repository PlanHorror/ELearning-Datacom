"use client";

import styles from "./home.page.module.scss";
import { useState, useEffect } from "react";
import { Button } from "@/shared/components/button/button.component";
import {
  FaGraduationCap,
  FaUsers,
  FaEnvelope,
  FaTicketAlt,
  FaRocket,
  FaLightbulb,
  FaGlobe,
  FaClock,
  FaChevronDown,
  FaTrophy,
  FaStar,
  FaHeart,
  FaGift,
  FaArrowRight,
  FaBook,
  FaPhoneAlt,
} from "react-icons/fa";
import { CouponService } from "@/modules/companies/services/coupon.service";
import {
  Tabs,
  Card,
  Progress,
  Badge,
  Divider,
  Avatar,
  Rate,
  Typography,
} from "antd";
import { motion } from "framer-motion";
import LessonComponent from "@/modules/lessons/presentation/components/lesson.component";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import { RouterPath } from "@/shared/constants/router.const";

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("popular");
  const router = useRouter();

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
      title: "Fast Learning",
      description: "Access knowledge anytime, anywhere",
    },
    {
      icon: <FaLightbulb />,
      title: "Quality Content",
      description: "Expert-crafted lessons and materials",
    },
    {
      icon: <FaGlobe />,
      title: "Global Community",
      description: "Connect with learners worldwide",
    },
    {
      icon: <FaGift />,
      title: "Real Rewards",
      description: "Earn points and redeem valuable coupons",
    },
  ];

  const stats = [
    { number: "1000+", label: "Active Students", icon: <FaUsers /> },
    { number: "50+", label: "Variety Lectures", icon: <FaGraduationCap /> },
    { number: "100+", label: "Available Coupons", icon: <FaTicketAlt /> },
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
      image: "/public/slider/slider_1.jpg",
      points: 500,
      expiry: "2023-12-31",
      linkedCourse: "Introduction to Digital Marketing",
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
      linkedCourse: "Business Japanese N3",
      pointsToComplete: 200,
      provider: "UNIQLO Japan",
      category: "popular",
    },
    {
      id: 4,
      name: "Lawson Free Coffee",
      image: "/public/slider/slider_1.jpg",
      points: 250,
      expiry: "2023-12-31",
      linkedCourse: "Introduction to Data Analysis",
      pointsToComplete: 100,
      provider: "Lawson Japan",
      category: "recommended",
    },
    {
      id: 5,
      name: "Rakuten Points (500pts)",
      image: "/public/slider/slider_2.jpg",
      points: 600,
      expiry: "2023-12-31",
      linkedCourse: "Project Management Fundamentals",
      pointsToComplete: 180,
      provider: "Rakuten",
      category: "new",
    },
    {
      id: 6,
      name: "JR East 10% Discount",
      image: "/public/slider/slider_3.jpg",
      points: 800,
      expiry: "2023-11-30",
      linkedCourse: "English Conversation Skills",
      pointsToComplete: 250,
      provider: "JR East Japan",
      category: "recommended",
    },
  ];

  const filteredRewards = rewardItems.filter(
    (item) => activeTab === "all" || item.category === activeTab
  );

  const handleStartLearning = () => {
    router.push(RouterPath.CUSTOMER_SIGNIN);
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
              Learn and earn what you love.
            </motion.h1>
            <motion.p
              className={styles.hero_description}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Earn coupons and rewards by studying. Real learning, real
              benefits.
            </motion.p>
            <motion.div
              className={styles.hero_buttons}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                className={styles.primary_button}
                name="Start Learning"
                onClick={handleStartLearning}
              />
              <Button
                className={styles.secondary_button}
                name="Explore Rewards"
                onClick={handleExploreRewards}
              />
            </motion.div>
            <motion.div
              className={styles.scroll_hint}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
            >
              <p>Check out this week&apos;s top coupons</p>
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
            <h2 className={styles.rewards_title}>Rewards Gallery</h2>
            <p className={styles.rewards_subtitle}>
              Study hard, earn points, claim real rewards
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
                  <FaStar /> Popular Now
                </span>
              }
              key="popular"
            />
            <TabPane
              tab={
                <span>
                  <FaGift /> New Arrivals
                </span>
              }
              key="new"
            />
            <TabPane
              tab={
                <span>
                  <FaHeart /> Recommended for You
                </span>
              }
              key="recommended"
            />
            <TabPane
              tab={
                <span>
                  <FaGlobe /> All Rewards
                </span>
              }
              key="all"
            />
          </Tabs>

          <div className={styles.rewards_grid}>
            {filteredRewards.map((reward) => (
              <motion.div
                key={reward.id}
                className={styles.reward_card}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
                }}
                transition={{ duration: 0.3 }}
              >
                <Badge.Ribbon text={`${reward.points} Points`} color="#ff6b6b">
                  <Card
                    className={styles.reward_card_inner}
                    cover={
                      <div className={styles.reward_image_container}>
                        <Image
                          src={reward.image}
                          alt={reward.name}
                          width={300}
                          height={200}
                          className={styles.reward_image}
                        />
                      </div>
                    }
                  >
                    <div className={styles.reward_provider}>
                      <span>{reward.provider}</span>
                      <Badge status="processing" text="Available" />
                    </div>
                    <Title level={4} className={styles.reward_name}>
                      {reward.name}
                    </Title>
                    <div className={styles.reward_expiry}>
                      <FaClock />
                      <span>
                        Expires: {new Date(reward.expiry).toLocaleDateString()}
                      </span>
                    </div>
                    <Divider className={styles.reward_divider} />

                    {/* 3. Link Between Learning and Rewards */}
                    <div className={styles.linked_course}>
                      <Title level={5}>Get this reward by completing:</Title>
                      <Text strong className={styles.course_name}>
                        <FaGraduationCap /> {reward.linkedCourse}
                      </Text>
                      <div className={styles.points_progress}>
                        <Progress
                          percent={30}
                          strokeColor="#1a237e"
                          format={() => `${reward.pointsToComplete} pts needed`}
                        />
                        <Text className={styles.points_away}>
                          You&apos;re only {reward.pointsToComplete - 75} points
                          away!
                        </Text>
                      </div>
                      <Button
                        className={styles.start_course_button}
                        name="Start Course"
                        icon={<FaArrowRight />}
                      />
                    </div>
                  </Card>
                </Badge.Ribbon>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Rest of the content */}
        <div className={styles.body_wrapper}>
          {/* 4. Trust & Motivation Section */}
          <div className={styles.trust_section}>
            <h2 className={styles.section_title}>Success Stories</h2>
            <p className={styles.section_description}>
              Hear from learners who have earned real rewards through our
              platform
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
                    <Avatar size={64} src={testimonial.avatar} />
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
              <h3 className={styles.stats_title}>Our Impact</h3>
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
              <h3 className={styles.activity_title}>Recent Activity</h3>
              <div className={styles.activity_list}>
                <div className={styles.activity_item}>
                  <FaTrophy className={styles.activity_icon} />
                  <div className={styles.activity_content}>
                    <Text strong>Tanaka S. earned a Starbucks coupon</Text>
                    <Text type="secondary">2 hours ago</Text>
                  </div>
                </div>
                <div className={styles.activity_item}>
                  <FaGraduationCap className={styles.activity_icon} />
                  <div className={styles.activity_content}>
                    <Text strong>
                      Yamada K. completed &quot;Business English&quot; course
                    </Text>
                    <Text type="secondary">4 hours ago</Text>
                  </div>
                </div>
                <div className={styles.activity_item}>
                  <FaGift className={styles.activity_icon} />
                  <div className={styles.activity_content}>
                    <Text strong>Suzuki H. redeemed Amazon Japan voucher</Text>
                    <Text type="secondary">Yesterday</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.lesson_wrapper}>
            <h2 className={styles.title}>Featured Courses</h2>
            <LessonComponent />
          </div>

          {/* 5. Footer & Support Area */}
          <div className={styles.footer_support}>
            <div className={styles.footer_grid}>
              <div className={styles.footer_section}>
                <h3>Language</h3>
                <div className={styles.language_switcher}>
                  <button className={`${styles.lang_button} ${styles.active}`}>
                    English
                  </button>
                  <button className={styles.lang_button}>日本語</button>
                </div>
              </div>

              <div className={styles.footer_section}>
                <h3>Quick Links</h3>
                <ul className={styles.footer_links}>
                  <li>
                    <FaBook /> Learning Resources
                  </li>
                  <li>
                    <FaGift /> Rewards Catalog
                  </li>
                  <li>
                    <FaUsers /> Community
                  </li>
                  <li>
                    <FaPhoneAlt /> Contact Support
                  </li>
                </ul>
              </div>

              <div className={styles.footer_section}>
                <h3>Help Center</h3>
                <ul className={styles.footer_links}>
                  <li>FAQ</li>
                  <li>Terms of Use</li>
                  <li>Privacy Policy</li>
                  <li>Cookie Policy</li>
                </ul>
              </div>

              <div className={styles.footer_section}>
                <h3>Stay Connected</h3>
                <div className={styles.newsletter_form}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={styles.newsletter_input}
                  />
                  <Button
                    className={styles.newsletter_button}
                    name="Subscribe"
                    icon={<FaEnvelope />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
