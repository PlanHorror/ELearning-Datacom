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

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: LoginPayLoad) => {
    try {
      setIsLoading(true);
      const { email, password } = values;
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.ok) {
        toast.success("Login successfully!");
        router.push(RouterPath.HOME);
      }
    } catch (error) {
      toast.error("Login failed. Please try again!");
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
            <h2>Sign In</h2>
            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              className={styles.form}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Email"
                  className={styles.input}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Password"
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
                  Sign In
                </Button>
              </Form.Item>

              <div className={styles.form_footer}>
                <p>
                  Don&apos;t have an account?{" "}
                  <Link href="/auth/signup" className={styles.signup_link}>
                    Sign up
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
