"use client";

import Image from "next/image";
import Email from "@/public/email.png";
import styles from "./verify.account.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const VerifyAccountPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const {data: session} = useSession();
  useEffect(() => {

    if (session?.user?.email) {
      setUserEmail(session?.user?.email);
    }
  }, []);
  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        <div className={styles.page_icon}>
          <Image alt="Email Icon" src={Email} width={90} height={90} />
        </div>
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
              After receiving the email follow the link provided to complete
              your registration.
            </p>
          </div>
          <div className={styles.page_sub_content_wrapper}>
            <div className={styles.page_sub_content}>
              <p>If you did not get any mail,</p>
              <Link href={""}>Resend confirmation mail</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccountPage;
