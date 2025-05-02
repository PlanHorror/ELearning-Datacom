"use client";

import styles from "./login.page.module.scss";
import { Col, Row } from "antd";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo-bgwhite.svg";
import elearning from "@/public/elearning_1.png";
import LoginFormComponent from "@/shared/components/login-form/login.form";


const CompanyLoginPage = () => {
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
              Login to experience my service!
            </h2>
          </div>
          <Image alt="" src={elearning} width={300} height={300} />
        </Col>
        <Col span={16} className={styles.form_wrapper}>
          <LoginFormComponent isLoading={true} />
        </Col>
      </Row>
    </div>
  );
};

export default CompanyLoginPage;
