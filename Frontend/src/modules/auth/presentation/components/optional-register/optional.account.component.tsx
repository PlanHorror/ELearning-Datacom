"use client";

import styles from "./optional.account.component.module.scss";
import { RouterPath } from "@/shared/constants/router.const";
import React, { useState } from "react";
import Link from "next/link";
import UserSignUpForm from "../user-signup-form/user-signup-form.component";
import CompanySignUpForm from "../company-signup-form/company-signup-form.component";
import personal from "@/public/authentication-card/personal.png";
import business from "@/public/authentication-card/business.png";
import Image from "next/image";
import { LoadingComponent } from "@/shared/components/loading/loading.component";

const OptionalAccount = () => {
  const [selected, setSelected] = useState<"user" | "company" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    return;
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return !selected ? (
    <>
      <h1 className={styles.form_title}>Sign Up!</h1>
      <h2 className={styles.form_sub_title}>
        Please select kind of account that you want register!
      </h2>

      <div className={styles.card_container}>
        <div
          className={styles.card_wrapper}
          onClick={() => setSelected("user")}
        >
          <div className={styles.card_main}>
            <Image alt="" src={personal} width={100} height={100} />
            <p className={styles.prompt}>User</p>
          </div>
        </div>
        <div
          className={styles.card_wrapper}
          onClick={() => setSelected("company")}
        >
          <div className={styles.card_main}>
            <Image alt="" src={business} width={100} height={100} />
            <p className={styles.prompt}>Company</p>
          </div>
        </div>
      </div>
      <p className={styles.form_text}>
        If you have an account,
        <Link href={RouterPath.SIGNIN}> Sign in</Link> here
      </p>
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
  );
};
export default OptionalAccount;
