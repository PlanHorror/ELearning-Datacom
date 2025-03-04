"use client";
import Image from "next/image";
import logo from "@/public/logo.svg";
import styles from "./register.module.scss";
import OptionalRegister from "../../components/optional-register/optional-register.component";

const RegisterPage = () => {
  return (
    <div className={styles.authentication_background}>
      <div className={styles.authentication_container}>
        <div className={styles.authentication_main}>
          <div className={styles.form_wrapper}>
            <div className={styles.logo}>
              <Image alt="" src={logo} width={300} height={150} />
            </div>
            <OptionalRegister />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
