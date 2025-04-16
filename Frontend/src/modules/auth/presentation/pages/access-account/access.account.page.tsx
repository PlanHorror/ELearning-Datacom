"use client";

import { Col, Row } from "antd";
import Link from "next/link";
import Image from "next/image";
import styles from "./access.account.page.module.scss";
import OptionalRegister from "../../components/optional-register/optional.account.component";
import logo from "@/public/logo-bgwhite.svg";
import elearning from "@/public/elearning_1.png";
import { useState } from "react";

const AccessAccountPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.authentication_container}>
      <Row className={styles.authentication_wrapper}>
        <Col span={8} className={styles.registration_step}>
          <Link href="/">
            <Image alt="" src={logo} width={200} height={200} />
          </Link>
          <div className={styles.describe_wrapper}>
            <h1 className={styles.form_title}>Welcome to Elearning Datacom</h1>
            <h2 className={styles.sub_title}>
              Choose kind of account to login!
            </h2>
          </div>
          <Image alt="" src={elearning} width={300} height={300} />
        </Col>
        <Col span={16} className={styles.form_wrapper}>
          <OptionalRegister 
            kindFunction="signin" 
            isLoading={isLoading}
            onLoadingChange={setIsLoading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default AccessAccountPage;
