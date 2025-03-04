// import { LoginPayload } from "@/modules/auth/domain/dto/login.dto";
import { Button, DatePicker, Form, Input as InputAntd, Select } from "antd";
import styles from "./user_signup_form.module.scss";
import { RouterPath } from "@/shared/constants/router.const";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

interface Props {
  onSubmit: () => void;
  goBack: () => void;
  isLoading: boolean;
}

const dateFormat = 'YYYY/MM/DD';

const UserSignUpForm = ({ onSubmit, goBack, isLoading }: Props) => {
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
            label={<p className={styles.label}>Username</p>}
            name="username"
            rules={[
              {
                type: "string",
                required: true,
                message: "Please input username!",
              },
            ]}
          >
            <InputAntd placeholder="Username" />
          </Form.Item>
        </div>

        <div className={styles.input_group}>
          <Form.Item
            label={<p className={styles.label}>Postal code</p>}
            name="postalCode"
            rules={[
              {
                type: "number",
                required: true,
                message: "Please input your postal code!",
              },
            ]}
          >
            <InputAntd placeholder="Postal code" />
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

        <div className={styles.wrapper_select}>
          <div className={styles.wrapper_select_item}>
            <p>Gender</p>
            <Select
              defaultValue=""
              style={{ width: 120 }}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "others", label: "Others" },
              ]}
            />
          </div>
          <div className={styles.wrapper_select_item}>
            <p>DOB</p>
            <DatePicker
              defaultValue={dayjs()}
              format={dateFormat}
            />
          </div>
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
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <InputAntd.Password placeholder="Retype Password" />
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

export default UserSignUpForm;
