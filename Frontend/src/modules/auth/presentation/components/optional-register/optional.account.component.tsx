"use client";

import styles from "./optional.account.component.module.scss";
import { RouterPath } from "@/shared/constants/router.const";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import UserSignUpForm from "../user-signup-form/user-signup-form.component";
import CompanySignUpForm from "../company-signup-form/company-signup-form.component";
import personal from "@/public/authentication-card/personal.png";
import business from "@/public/authentication-card/business.png";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import { LoadingComponent } from "@/shared/components/loading/loading.component";

interface Props {
  kindFunction: "signin" | "signup";
}

const OptionalAccount = ({ kindFunction }: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState<"user" | "company" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (kindFunction === "signin" && selected) {
      setIsLoading(true);
      if (selected === "user") {
        router.push(RouterPath.CUSTOMER_SIGNIN);
      } else if (selected === "company") {
        router.push(RouterPath.COMPANY_SIGNIN);
      }
    }
  }, [selected, kindFunction, router]);

  const handleClick = () => {
    return;
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      {kindFunction === "signup" ? (
        !selected ? (
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
              <Link href={RouterPath.OPTIONAL_SIGNIN}> Sign in</Link> here
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
        )
      ) : (
        <>
          <h1 className={styles.form_title}>Sign In!</h1>
          <h2 className={styles.form_sub_title}>
            Please select kind of account that you want login!
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
            Don&apos;t have an account yet?
            <Link href={RouterPath.SIGNUP}> Sign up</Link> here
          </p>
        </>
      )}
    </>
  );
};

export default OptionalAccount;
