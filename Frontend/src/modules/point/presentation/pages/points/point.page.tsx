import PointComponent from "../../components/point.component";
import styles from "./point.page.module.scss";
const PointPage = () => {
  return (
    <>
      <div className={styles.page_container}>
        <div className={styles.title_wrapper}>
          <p className={styles.sub_title}>Point</p>
          <h1 className={styles.title}>History Of Points</h1>
        </div>
        <div className={styles.history_point_wrapper}>
          <PointComponent />
        </div>
      </div>
    </>
  );
};

export default PointPage;
