import LessonComponent from "../../components/lesson.component";
import styles from "./lesson.page.module.scss";

const ListLessonPage = () => {
  return (
    <div className={styles.page_container}>
      <div className={styles.title_wrapper}>
        <p className={styles.sub_title}>Lessons</p>
        <h1 className={styles.title}>List Lesson</h1>
      </div>
      <LessonComponent />
    </div>
  );
};

export default ListLessonPage;
