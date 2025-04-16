import { Col, Row } from "antd";
import styles from "./lesson.component.module.scss";
import Link from "next/link";

const LessonComponent = () => {
  return (
    <div className={styles.lesson_container}>
      <Row className={styles.lesson_wrapper} gutter={[20, 20]}>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <p className={styles.school}>Primary School</p>
          <ul className={styles.lesson_list_wrapper}>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/7/"}
                className={styles.math}
              >
                <div className={styles.box_math}></div>
                <p>Math</p>
              </Link>
            </li>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/15/"}
                className={styles.science}
              >
                <div className={styles.box_science}></div>
                <p>Science</p>
              </Link>
            </li>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/14/"}
                className={styles.sociology}
              >
                <div className={styles.box_sociology}></div>
                <p>Sociology</p>
              </Link>
            </li>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/12/"}
                className={styles.english}
              >
                <div className={styles.box_english}></div>
                <p>English</p>
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <p className={styles.school}>Secondary School</p>
          <ul className={styles.lesson_list_wrapper}>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/1/"}
                className={styles.math}
              >
                <div className={styles.box_math}></div>
                <p>Math</p>
              </Link>
            </li>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/6/"}
                className={styles.science}
              >
                <div className={styles.box_science}></div>
                <p>Science</p>
              </Link>
            </li>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/3/"}
                className={styles.sociology}
              >
                <div className={styles.box_sociology}></div>
                <p>Sociology</p>
              </Link>
            </li>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/13/"}
                className={styles.japanese}
              >
                <div className={styles.box_japanese}></div>
                <p>Japanese</p>
              </Link>
            </li>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/2/"}
                className={styles.english}
              >
                <div className={styles.box_english}></div>
                <p>English</p>
              </Link>
            </li>
          </ul>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <p className={styles.school}>High School</p>
          <ul className={styles.lesson_list_wrapper}>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/16/"}
                className={styles.math}
              >
                <div className={styles.box_math}></div>
                <p>Math</p>
              </Link>
            </li>
            <li className={styles.lesson_list_item}>
              <Link
                href={"https://www.eboard.jp/list/17/"}
                className={styles.english}
              >
                <div className={styles.box_english}></div>
                <p>English</p>
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  );
};

export default LessonComponent;
