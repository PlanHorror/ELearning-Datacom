import { Form, Input as InputAntd, message } from "antd";
import styles from "./login-form.module.scss";
import { RouterPath } from "@/shared/constants/router.const";
import { Button } from "@/shared/components/button/button.component";
import Link from "next/link";
import { LoginPayLoad } from "@/modules/auth/domain/login.dto";
import { signin } from "@/modules/auth/services/authService";
import { useRouter } from "next/navigation";

interface Props {
  onSubmit: () => void;
  isLoading: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: Props) => {
  const router = useRouter();
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoginPayLoad) => {
    try {
      const res = await signin(values);
      if (res && res.data.success) {
        message.success("Login successfully!");
        onSubmit();
        router.push(RouterPath.SIGNIN);
      }
    } catch (error) {
      message.error("Login failed!");
      console.log(error);
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
      // className={styles.form_container}
    >
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
        <Link href={RouterPath.SIGNIN}>Forgot Password</Link>
      </p>
      {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}></Form.Item> */}
      <Button
        className={styles.btn}
        type="primary"
        htmlType="submit"
        name="Login"
      />
      <p className={styles.form_text}>
        Don&apos;t have an account yet?
        <Link href={RouterPath.SIGNUP}> Register</Link> here
      </p>
    </Form>
  );
};

export default LoginForm;
