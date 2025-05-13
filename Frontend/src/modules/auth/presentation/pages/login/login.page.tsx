"use client";

import { Col, Row, Form, Input, Button } from "antd";
import Link from "next/link";
import { useState } from "react";
import styles from "./login.page.module.scss";
import { useRouter } from "@/i18n/navigation";
import { LoginPayLoad } from "@/modules/auth/domain/dto/login.dto";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { RouterPath } from "@/shared/constants/router.const";
import { useTranslations } from "next-intl";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations();

  const onFinish = async (values: LoginPayLoad) => {
    try {
      setIsLoading(true);
      const { email, password } = values;
      const res = await signIn("credentials", {
        email,
        password,
        role: "User",
        redirect: false,
      });
      if (res?.ok) {
        toast.success(t("auth.loginSuccess"));
        router.push(RouterPath.HOME);
      }
    } catch (error) {
      toast.error(t("auth.loginFailed"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.login_container}>
      <Row className={styles.login_wrapper}>
        <Col className={styles.login_form}>
          <div className={styles.form_container}>
            <h2>{t("auth.login")}</h2>
            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              className={styles.form}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: t("auth.emailRequired") },
                  { type: "email", message: t("auth.emailInvalid") },
                ]}
              >
                <Input
                  size="large"
                  placeholder={t("auth.email")}
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: t("auth.passwordRequired") },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder={t("auth.password")}
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading}
                  className={styles.submit_button}
                  size="large"
                >
                  {t("auth.login")}
                </Button>
              </Form.Item>

              <div className={styles.form_footer}>
                <p>
                  {t("auth.noAccount")}{" "}
                  <Link href="/auth/signup" className={styles.signup_link}>
                    {t("auth.signup")}
                  </Link>
                </p>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;
