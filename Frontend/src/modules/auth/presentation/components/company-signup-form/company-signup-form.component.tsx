"use client";

import { Button, Form, Input as InputAntd, message } from "antd";
import styles from "./company-signup-form.module.scss";
import { RouterPath } from "@/shared/constants/router.const";
import React from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { CompanySignUpPayLoad } from "@/modules/auth/domain/dto/register.dto";
import { AuthUseCase } from "@/modules/auth/domain/usecases/auth.usecase";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface Props {
  onSubmit: () => void;
  goBack: () => void;
  isLoading: boolean;
}

const CompanySignUpForm = ({ onSubmit, goBack, isLoading }: Props) => {
  const authUseCase = new AuthUseCase();
  const router = useRouter();
  const [form] = Form.useForm();
  const t = useTranslations();

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
      console.error(error);
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
        <h1 className={styles.form_title}>{t("auth.createBusinessAccount")}</h1>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>{t("auth.companyName")}</p>}
            name="company_name"
            rules={[
              {
                type: "string",
                required: true,
                message: t("auth.companyNameRequired"),
              },
            ]}
          >
            <InputAntd placeholder={t("auth.companyName")} />
          </Form.Item>
        </div>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>{t("auth.address")}</p>}
            name="address"
            rules={[
              {
                type: "string",
                required: true,
                message: t("auth.addressRequired"),
              },
            ]}
          >
            <InputAntd placeholder={t("auth.address")} />
          </Form.Item>
        </div>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>{t("auth.email")}</p>}
            name="email"
            rules={[
              {
                type: "email",
                required: true,
                message: t("auth.emailRequired"),
              },
            ]}
          >
            <InputAntd placeholder={t("auth.email")} />
          </Form.Item>
        </div>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>{t("auth.password")}</p>}
            name="password"
            rules={[{ required: true, message: t("auth.passwordRequired") }]}
          >
            <InputAntd.Password placeholder={t("auth.password")} />
          </Form.Item>
        </div>

        <div className={styles.wrapper_btn}>
          <Button className={styles.btn} onClick={goBack} type="default">
            <ArrowLeftOutlined /> {""}
            {t("auth.return")}
          </Button>
          <Button
            className={styles.btn}
            type="default"
            loading={isLoading}
            htmlType="submit"
          >
            {t("auth.register")}
            <ArrowRightOutlined />
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CompanySignUpForm;
