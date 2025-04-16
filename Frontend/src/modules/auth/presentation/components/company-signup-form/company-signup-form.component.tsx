"use client";

import { Button, Form, Input as InputAntd, message } from "antd";
import styles from "./company-signup-form.module.scss";
import { RouterPath } from "@/shared/constants/router.const";
import React from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { CompanySignUpPayLoad } from "@/modules/auth/domain/dto/register.dto";
import { AuthUseCase } from "@/modules/auth/domain/usecases/auth.usecase";
import { useRouter } from "@/i18n/navigation";

interface Props {
  onSubmit: () => void;
  goBack: () => void;
  isLoading: boolean;
}

const CompanySignUpForm = ({ onSubmit, goBack, isLoading }: Props) => {
  const authUseCase = new AuthUseCase();
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = async (values: CompanySignUpPayLoad) => {
    try {
      const res = await authUseCase.companySignUp(values);

      if (res && res.data.status === "Inactive") {
        sessionStorage.setItem("email", values.email);
        message.success("Sign up successfully!");
        onSubmit();
        router.push(RouterPath.VERIFY_ACCOUNT);
      }
    } catch (error) {
      message.error("Sign up failed!");
      console.log(error);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="register"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
        disabled={isLoading}
        layout="vertical"
        style={{ width: 450 }}
      >
        <h1 className={styles.form_title}>Create a new account for business</h1>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>Company Name</p>}
            name="company_name"
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input your company name!",
              },
            ]}
          >
            <InputAntd placeholder="Company Name" />
          </Form.Item>
        </div>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>Address</p>}
            name="address"
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <InputAntd placeholder="Address" />
          </Form.Item>
        </div>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>Email</p>}
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <InputAntd placeholder="Email" />
          </Form.Item>
        </div>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>Password</p>}
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <InputAntd.Password placeholder="Password" />
          </Form.Item>
        </div>

        <div className={styles.wrapper_btn}>
          <Button className={styles.btn} onClick={goBack} type="default">
            <ArrowLeftOutlined /> {""}
            Return
          </Button>
          <Button
            className={styles.btn}
            type="default"
            loading={isLoading}
            htmlType="submit"
          >
            Sign Up
            <ArrowRightOutlined />
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CompanySignUpForm;
