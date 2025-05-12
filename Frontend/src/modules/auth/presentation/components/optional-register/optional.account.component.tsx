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
import { useTranslations } from "next-intl";

const OptionalAccount = () => {
  const [selected, setSelected] = useState<"user" | "company" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations();

  const handleClick = () => {
    return;
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return !selected ? (
    <>
      <h1 className={styles.form_title}>{t("auth.signup")}</h1>
      <h2 className={styles.form_sub_title}>{t("auth.selectAccountType")}</h2>

      <div className={styles.card_container}>
        <div
          className={styles.card_wrapper}
          onClick={() => setSelected("user")}
        >
          <div className={styles.card_main}>
            <Image alt="" src={personal} width={100} height={100} />
            <p className={styles.prompt}>{t("auth.user")}</p>
          </div>
        </div>
        <div
          className={styles.card_wrapper}
          onClick={() => setSelected("company")}
        >
          <div className={styles.card_main}>
            <Image alt="" src={business} width={100} height={100} />
            <p className={styles.prompt}>{t("auth.company")}</p>
          </div>
        </div>
      </div>
      <p className={styles.form_text}>
        {t("auth.haveAccount")}
        <Link href={RouterPath.SIGNIN}> {t("auth.login")}</Link>{" "}
        {t("auth.here")}
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
