"use client";

import Image from "next/image";
import Email from "@/public/email.png";
import styles from "./verify.account.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";

const VerifyAccountPage = () => {
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const email = sessionStorage.getItem("email");
    if (email) {
      setUserEmail(email);
    }
  }, []);
  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        <Image alt="" src={Email} width={200} height={200} />
        <div className={styles.page_content_wrapper}>
          <h1 className={styles.page_title}>Email Confirmation</h1>
          <div className={styles.page_describe}>
            <p>
              We have sent email to
              <Link
                href={"https://mail.google.com/"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <strong> {userEmail}.</strong>
              </Link>
            </p>
            <p>Please confirm the validity of our email address.</p>
            <p>
              After receiving the email follow the link provided to complete you
              registration.
            </p>
          </div>
          <div className={styles.page_sub_content_wrapper}>
            <div className={styles.page_sub_content}>
              <p>If you not got any mail,</p>
              <Link href={""}>Resend confirmation mail</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
