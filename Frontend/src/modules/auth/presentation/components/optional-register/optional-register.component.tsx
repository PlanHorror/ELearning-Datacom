import styles from "./optional-register.module.scss";
import { Button } from "@/shared/components/button/button.component";
import { RouterPath } from "@/shared/constants/router.const";
import React, { useState } from "react";
import Link from "next/link";
import UserSignUpForm from "../user-signup-form/user-signup-form.component";
import CompanySignUpForm from "../company-signup-form/company-signup-form.component";

const OptionalRegister = () => {
  const [selected, setSelected] = useState<"user" | "company" | null>(null);
  const handleClick = () => {
    return;
  };
  return (
    <>
      <p className={styles.form_subtext}>
        Don&apos;t have an account yet? Register here
      </p>

      {!selected ? (
        <>
          <h2>Select kind of account</h2>
          <div className={styles.wrapper_options}>
            <Button
              className={styles.btn}
              type="primary"
              htmlType="submit"
              name="User"
              onClick={() => setSelected("user")}
            />
            <Button
              className={styles.btn}
              type="primary"
              htmlType="submit"
              name="Company"
              onClick={() => setSelected("company")}
            />
          </div>
        </>
      ) : selected === "user" ? (
        <UserSignUpForm
          goBack={() => setSelected(null)}
          onSubmit={handleClick}
          isLoading={false}
        />
      ) : (
        <CompanySignUpForm
          onSubmit={handleClick}
          goBack={() => setSelected(null)}
          isLoading={false}
        />
      )}
      <p className={styles.form_text}>
        Do you already have an account?
        <Link href={RouterPath.SIGNIN}> Sign up</Link> {""}
        here
      </p>
    </>
  );
};

export default OptionalRegister;
