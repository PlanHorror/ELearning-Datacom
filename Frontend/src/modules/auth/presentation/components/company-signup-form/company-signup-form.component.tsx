// import { LoginPayload } from "@/modules/auth/domain/dto/login.dto";
import { Button, Form, Input as InputAntd } from "antd";
import styles from "./company-signup-form.module.scss";
import { RouterPath } from "@/shared/constants/router.const";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

interface Props {
  onSubmit: () => void;
  goBack: () => void;
  isLoading: boolean;
}

const CompanySignUpForm = ({ onSubmit, goBack, isLoading }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(RouterPath.HOME);
  };

  return (
    <>
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        disabled={isLoading}
        layout="vertical"
      >
        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>Company Name</p>}
            name="name"
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

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>Confirm Password</p>}
            name="Confirm Password"
            rules={[
              {
                required: true,
                message: "Please input your confirm password!",
              },
            ]}
          >
            <InputAntd.Password placeholder="Confirm Password" />
          </Form.Item>
        </div>

        <div className={styles.wrapper_btn}>
          <Button className={styles.btn} onClick={goBack} type="link">
            <ArrowLeftOutlined /> {""}
            Return
          </Button>
          <Button className={styles.btn} type="link" onClick={handleClick}>
            Sign Up
            <ArrowRightOutlined />
          </Button>
        </div>
      </Form>
    </>
  );
};

export default CompanySignUpForm;
