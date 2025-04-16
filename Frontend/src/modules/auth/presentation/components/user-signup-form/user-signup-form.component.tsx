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

interface Props {
  onSubmit: () => void;
  goBack: () => void;
  isLoading: boolean;
}

const UserSignUpForm = ({ onSubmit, goBack, isLoading }: Props) => {
  const authUseCase = new AuthUseCase();
  const router = useRouter();
  const [form] = Form.useForm();
  
  const handleSubmit = async (values: UserSignUpPayLoad) => {
    try {
      const res = await authUseCase.userSignUp(values);
      console.log(res);
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
        <h1 className={styles.form_title}>Create a new account for personal</h1>

        <div className={styles.input_groups}>
          <Form.Item
            label={<p className={styles.label}>Username</p>}
            name="username"
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input username!",
              },
              { min: 3, message: "Username must be at least 3 characters!" },
            ]}
          >
            <InputAntd placeholder="Username" />
          </Form.Item>
          <Form.Item
            label={<p className={styles.label}>Postal code</p>}
            name="postal_code"
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input your postal code!",
              },
            ]}
          >
            <InputAntd placeholder="Postal code" />
          </Form.Item>
        </div>

        <div className={styles.input_groups}>
          <Form.Item
            label={<p>Gender</p>}
            name="gender"
            rules={[{ required: true, message: "Please choose your gender!" }]}
          >
            <Select
              placeholder="Choose your gender"
              options={[
                { value: Gender.male, label: Gender.male },
                { value: Gender.female, label: Gender.female },
                { value: Gender.other, label: Gender.other },
              ]}
            />
          </Form.Item>
          <Form.Item
            label={<p>DOB</p>}
            name="dob"
            rules={[
              { required: true, message: "Please input your date of birth!" },
            ]}
          >
            <DatePicker
              className={styles.datepicker_input}
              format="YYYY/MM/DD"
            />
          </Form.Item>
        </div>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>Address</p>}
            name="prefecture"
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

export default UserSignUpForm;
