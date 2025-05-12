"use client";

import ProfileComponent from "../../components/profile/profile.component";
import styles from "./profile.page.module.scss";
import { useTranslations } from "next-intl";

const ProfilePage = () => {
  const t = useTranslations();
  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        <div className={styles.title_wrapper}>
          <p className={styles.sub_title}>{t("profile.subTitle")}</p>
          <h1 className={styles.title}>{t("profile.title")}</h1>
        </div>
        <div className={styles.profile_component_wrapper}>
          <ProfileComponent />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
