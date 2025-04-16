"use client";

import { Form, Input as InputAntd } from "antd";
import styles from "./login-form.module.scss";
import { RouterPath } from "@/shared/constants/router.const";
import { Button } from "@/shared/components/button/button.component";
import Link from "next/link";
import { LoginPayLoad } from "@/modules/auth/domain/dto/login.dto";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "@/i18n/navigation";

interface Props {
  // onSubmit: () => void;
  isLoading: boolean;
}

const CustomerLoginForm = ({ isLoading }: Props) => {
  // const authUseCase = new AuthUseCase();
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoginPayLoad) => {
    const { email, password } = values;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if(res?.ok) {
      toast.success("Login successfully!");
      router.push(RouterPath.HOME);
    } else {
      toast.error("Login failed!");
    }
  };

  return (
    <Form
      name="login"
      form={form}
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
      disabled={isLoading}
      layout="vertical"
      style={{ width: 450 }}
    >
      <h1 className={styles.form_title}>Login to Elearning Datacom for personal!</h1>
      <div className={styles.input_group}>
        <Form.Item
          label={<p className={styles.label}>Email</p>}
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Email is required",
            },
          ]}
        >
          <InputAntd placeholder="" />
        </Form.Item>
      </div>

      <div className={styles.input_group}>
        <Form.Item
          label={<p className={styles.label}>Password</p>}
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <InputAntd.Password />
        </Form.Item>
      </div>
      <p className={(styles.form_text, styles.form_text_forgot_password)}>
        <Link href={RouterPath.OPTIONAL_SIGNIN}>Forgot Password</Link>
      </p>
      {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item> */}
      <Button
        className={styles.btn}
        type="default"
        htmlType="submit"
        name="Login"
      />
      <p className={styles.form_text}>
        Don&apos;t have an account yet?
        <Link href={RouterPath.SIGNUP}> Sign up</Link> here
      </p>
    </Form>
  );
};

export default CustomerLoginForm;
