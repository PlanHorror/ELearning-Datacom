import React from "react";
import { Empty } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import styles from "./EmptyState.module.scss";
import { useTranslations } from "next-intl";

export const EmptyState: React.FC = () => {
  const t = useTranslations();
  return (
    <div className={styles.emptyState}>
      <Empty
        image={<HeartOutlined className={styles.emptyIcon} />}
        imageStyle={{ height: 60 }}
        description={
          <div className={styles.emptyContent}>
            <h3>{t("favourite.emptyTitle")}</h3>
            <p>{t("favourite.emptyDesc")}</p>
          </div>
        }
      />
    </div>
  );
};
