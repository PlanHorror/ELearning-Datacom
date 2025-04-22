"use client";

import ProfileComponent from "../../components/profile/profile.component";
import styles from "./profile.page.module.scss";

const ProfilePage = () => {
  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        <div className={styles.title_wrapper}>
          <p className={styles.sub_title}>Profile</p>
          <h1 className={styles.title}>Profile</h1>
        </div>
        <div className={styles.profile_component_wrapper}>
          <ProfileComponent />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
