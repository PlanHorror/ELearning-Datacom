import { Flex, Spin } from "antd";
import { useTranslations } from "next-intl";
import styles from "./loading.component.module.scss";

export const LoadingComponent = () => {
  const t = useTranslations();

  return (
    <div className={styles.loading_overlay}>
      <Flex
        gap="middle"
        vertical
        align="center"
        justify="center"
        className={styles.loading_content}
      >
        <Spin 
          tip={t("page_loading.content")} 
          size="large"
          className={styles.spin}
        >
          <div className={styles.spin_content} />
        </Spin>
      </Flex>
    </div>
  );
};
