import React from "react";
import { Empty } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import styles from "./EmptyState.module.scss";

export const EmptyState: React.FC = () => {
  return (
    <div className={styles.emptyState}>
      <Empty
        image={<HeartOutlined className={styles.emptyIcon} />}
        imageStyle={{ height: 60 }}
        description={
          <div className={styles.emptyContent}>
            <h3>No Favorite Coupons Yet</h3>
            <p>Start adding coupons to your favorites to see them here!</p>
          </div>
        }
      />
    </div>
  );
};
