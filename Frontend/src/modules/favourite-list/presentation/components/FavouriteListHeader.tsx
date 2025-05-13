import React from "react";
import styles from "./FavouriteListHeader.module.scss";
import { useTranslations } from "next-intl";

export const FavouriteListHeader: React.FC = () => {
  const t = useTranslations();
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{t("favourite.title")}</h1>
      <p className={styles.description}>{t("favourite.headerDesc")}</p>
    </div>
  );
};
