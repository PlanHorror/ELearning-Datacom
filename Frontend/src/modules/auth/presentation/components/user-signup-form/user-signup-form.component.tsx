"use client";

import {
  Button,
  DatePicker,
  Form,
  Input as InputAntd,
  message,
  Select,
} from "antd";
import styles from "./user_signup_form.module.scss";
import { RouterPath } from "@/shared/constants/router.const";
import React from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { UserSignUpPayLoad } from "@/modules/auth/domain/dto/register.dto";
import { AuthUseCase } from "@/modules/auth/domain/usecases/auth.usecase";
import { Gender } from "@/shared/constants/gender";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface Props {
  onSubmit: () => void;
  goBack: () => void;
  isLoading: boolean;
}

const UserSignUpForm = ({ onSubmit, goBack, isLoading }: Props) => {
  const authUseCase = new AuthUseCase();
  const router = useRouter();
  const [form] = Form.useForm();
  const t = useTranslations();

  const handleSubmit = async (values: UserSignUpPayLoad) => {
    try {
      const res = await authUseCase.userSignUp(values);
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
        <h1 className={styles.form_title}>{t("auth.createAccount")}</h1>

        <div className={styles.input_groups}>
          <Form.Item
            label={<p className={styles.label}>{t("auth.username")}</p>}
            name="username"
            rules={[
              {
                type: "string",
                required: true,
                message: t("auth.usernameRequired"),
              },
              { min: 3, message: t("auth.usernameMin") },
            ]}
          >
            <InputAntd placeholder={t("auth.username")} />
          </Form.Item>
          <Form.Item
            label={<p className={styles.label}>{t("auth.postalCode")}</p>}
            name="postal_code"
            rules={[
              {
                type: "string",
                required: true,
                message: t("auth.postalCodeRequired"),
              },
            ]}
          >
            <InputAntd placeholder={t("auth.postalCode")} />
          </Form.Item>
        </div>

        <div className={styles.input_groups}>
          <Form.Item
            label={<p>{t("auth.gender")}</p>}
            name="gender"
            rules={[{ required: true, message: t("auth.genderRequired") }]}
          >
            <Select
              placeholder={t("auth.genderPlaceholder")}
              options={[
                { value: Gender.male, label: Gender.male },
                { value: Gender.female, label: Gender.female },
                { value: Gender.other, label: Gender.other },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={<p>{t("auth.dob")}</p>}
            name="dob"
            rules={[{ required: true, message: t("auth.dobRequired") }]}
          >
            <DatePicker
              className={styles.datepicker_input}
              format="YYYY/MM/DD"
            />
          </Form.Item>
        </div>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>{t("auth.address")}</p>}
            name="prefecture"
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

export default UserSignUpForm;
