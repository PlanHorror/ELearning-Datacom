import LessonComponent from "../../components/lesson.component";
import styles from "./lesson.page.module.scss";
import { useTranslations } from "next-intl";

const ListLessonPage = () => {
  const t = useTranslations();
  return (
    <div className={styles.page_container}>
      <div className={styles.title_wrapper}>
        <p className={styles.sub_title}>{t("lessons.title")}</p>
        <h1 className={styles.title}>{t("lessons.listTitle")}</h1>
      </div>
      <LessonComponent />
    </div>
  );
};

export default ListLessonPage;
