"use client";

import styles from "./register.module.scss";
import OptionalRegister from "../../components/optional-register/optional.account.component";
import { Col, Row } from "antd";
import Image from "next/image";
import logo from "@/public/logo-bgwhite.svg";
import elearning from "@/public/elearning_1.png";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
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
              Register account to experience my service!
            </h2>
          </div>
          <Image alt="" src={elearning} width={300} height={300} />
        </Col>
        <Col span={16} className={styles.form_wrapper}>
          <OptionalRegister 
            kindFunction="signup" 
            isLoading={isLoading}
            onLoadingChange={setIsLoading}
          />
        </Col>
      </Row>
    </div>
  );
};

export default RegisterPage;
