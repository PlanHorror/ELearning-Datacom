"use client";

import styles from "./footer.component.module.scss";
import { useTranslations } from "next-intl";
import {
  FaUsers,
  FaEnvelope,
  FaGift,
  FaBook,
  FaPhoneAlt,
} from "react-icons/fa";
import { Button } from "../button/button.component";

const Footer = () => {
  const t = useTranslations();

  return (
    <div className={styles.footer_container}>
      <div className={styles.footer_wrapper}>
        <div className={styles.footer_section}>
          <h3>{t("home.footer.stayConnected")}</h3>
          <div className={styles.newsletter_form}>
            <input
              type="email"
              placeholder={t("home.footer.emailPlaceholder")}
              className={styles.newsletter_input}
            />
            <Button
              className={styles.newsletter_button}
              name={t("home.footer.subscribe")}
              icon={<FaEnvelope />}
            />
          </div>
        </div>

        <div className={styles.footer_section}>
          <h3>INFORMATION</h3>
          <ul className={styles.footer_links}>
            <li>
              <strong>Address</strong>
              <p>Tokyo</p>
            </li>
            <li>
              <strong>Email</strong>
              <p>datacom@gmail.com</p>
            </li>
            <li>
              <strong>Hotline</strong>
              <p>+84961436448</p>
            </li>
            <li>
              <strong>Support Time</strong>
              <p>8:00 AM - 6:00 PM</p>
            </li>
          </ul>
        </div>

        <div className={styles.footer_section}>
          <h3>{t("home.footer.quickLinks")}</h3>
          <ul className={styles.footer_links}>
            <li>
              <FaBook /> {t("home.footer.learningResources")}
            </li>
            <li>
              <FaGift /> {t("home.footer.rewardsCatalog")}
            </li>
            <li>
              <FaUsers /> {t("home.footer.community")}
            </li>
            <li>
              <FaPhoneAlt /> {t("home.footer.contactSupport")}
            </li>
          </ul>
        </div>

        <div className={styles.footer_section}>
          <h3>{t("home.footer.helpCenter")}</h3>
          <ul className={styles.footer_links}>
            <li>{t("home.footer.faq")}</li>
            <li>{t("home.footer.termsOfUse")}</li>
            <li>{t("home.footer.privacyPolicy")}</li>
            <li>{t("home.footer.cookiePolicy")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
