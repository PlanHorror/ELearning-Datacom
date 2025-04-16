"use client";

import SliderComponent from "@/shared/components/slider/slider.component";
import styles from "./home.page.module.scss";
// import CardIntroduction from "@/shared/components/card-introduction/card-introduction.component";
import { useState } from "react";
import { Button } from "@/shared/components/button/button.component";
import classNames from "classnames";
import LessonComponent from "@/modules/lessons/presentation/components/lesson.component";
import { FaGraduationCap, FaUsers, FaStar, FaEnvelope } from "react-icons/fa";

const HomePage = () => {
  const [selected, setSelected] = useState("News");
  const [email, setEmail] = useState("");

  const stats = [
    { number: "1000+", label: "Active Students", icon: <FaUsers /> },
    { number: "50+", label: "Expert Teachers", icon: <FaGraduationCap /> },
    { number: "4.8", label: "Average Rating", icon: <FaStar /> },
  ];

  const testimonials = [
    {
      name: "John Doe",
      role: "Student",
      content: "The courses are well-structured and easy to follow. I've learned so much!",
      rating: 5
    },
    {
      name: "Jane Smith",
      role: "Teacher",
      content: "Great platform for sharing knowledge. The interface is user-friendly.",
      rating: 5
    }
  ];

  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        <div className={styles.slider_wrapper}>
          <SliderComponent />
          <div className={styles.footer_slider}></div>
        </div>
        <div className={styles.body_wrapper}>
          <div className={styles.introduction_wrapper}>
            <div className={styles.introduction_title}>
              <h2>Welcome to Elearning Datacom</h2>
            </div>
            <div className={styles.introduction_describe}>
              <p>
                A learning support system that allows them to study autonomously
                outside of school
              </p>
              <p>for free or at a low cost.</p>
            </div>
            {/* <div className={styles.card_introduction_wrapper}>
              <CardIntroduction />
            </div> */}
          </div>

          {/* Statistics Section */}
          <div className={styles.stats_wrapper}>
            <h2 className={styles.title}>Our Impact</h2>
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

          <div className={styles.lesson_wrapper}>
            <h2 className={styles.title}>Featured Courses</h2>
            <LessonComponent />
          </div>

          {/* Testimonials Section */}
          <div className={styles.testimonials_wrapper}>
            <h2 className={styles.title}>What Our Users Say</h2>
            <div className={styles.testimonials_grid}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonial_card}>
                  <div className={styles.testimonial_content}>
                    "{testimonial.content}"
                  </div>
                  <div className={styles.testimonial_author}>
                    <div className={styles.author_name}>{testimonial.name}</div>
                    <div className={styles.author_role}>{testimonial.role}</div>
                  </div>
                  <div className={styles.testimonial_rating}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className={styles.star} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.popular_coupons_wrapper}>
            <h2 className={styles.title}>Coupons</h2>
            <div className={styles.button_wrapper}>
              <Button
                className={classNames(styles.button_item, {
                  [styles.active]: selected === "News",
                })}
                name="News"
              />
              <Button
                className={classNames(styles.button_item, {
                  [styles.active]: selected === "Popular",
                })}
                name="Popular"
              />
            </div>
          </div>

          {/* Newsletter Section */}
          <div className={styles.newsletter_wrapper}>
            <h2 className={styles.title}>Stay Updated</h2>
            <div className={styles.newsletter_content}>
              <p>Subscribe to our newsletter for the latest updates and offers</p>
              <div className={styles.newsletter_form}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

          <div className={styles.counterparty_wrapper}>
            <h2 className={styles.title}>Counterparty</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
