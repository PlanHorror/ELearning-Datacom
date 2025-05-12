"use client";

import styles from "./register.module.scss";
import OptionalRegister from "../../components/optional-register/optional.account.component";
import { Col, Row } from "antd";
import Image from "next/image";
import logo from "@/public/logo-bgwhite.svg";
import Link from "next/link";
import elearning from "@/public/elearning_1.png";
import { motion } from "framer-motion";

const RegisterPage = () => {
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.authentication_container}>
      <Row className={styles.authentication_wrapper}>
        <Col span={12} className={styles.registration_step}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/">
              <Image
                alt="Logo"
                src={logo}
                width={120}
                height={120}
                className={styles.logo}
              />
            </Link>
            <div className={styles.describe_wrapper}>
              <h1 className={styles.form_title}>
                Welcome to Elearning Datacom
              </h1>
              <h2 className={styles.sub_title}>
                Register to unlock your learning journey!
              </h2>
              <p className={styles.slogan}>
                Empower your knowledge. Connect. Grow. Succeed.
              </p>
            </div>
            <Image
              alt="Learning Illustration"
              src={elearning}
              width={320}
              height={260}
              // className={styles.elearning}
            />
          </motion.div>
        </Col>
        <Col span={12} className={styles.form_wrapper}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.form_card}
          >
            <OptionalRegister />
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
