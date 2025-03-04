"use client";

// import { LoginPayload } from "@/modules/auth/domain/dto/login.dto";
// import LoginForm from "../../components/login-form/login-form.component";
import styles from "./login.module.scss";
import logo from "@/public/logo.svg";
import Image from "next/image";
import LoginForm from "../../components/login-form/login-form.component";

const LoginPage = () => {
  return (
    <div className={styles.authentication_background}>
      <div className={styles.authentication_container}>
        <div className={styles.authentication_main}>
          <div className={styles.form_wrapper}>
            <div className={styles.logo}>
              <Image alt="" src={logo} width={300} height={150}/>
            </div>
            <LoginForm
              onSubmit={function (): void {
                throw new Error("Function not implemented.");
              }}
              isLoading={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;