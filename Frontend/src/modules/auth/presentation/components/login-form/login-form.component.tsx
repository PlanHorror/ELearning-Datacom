import { Form, Input as InputAntd } from "antd";
import styles from "./login-form.module.scss";
import { RouterPath } from "@/shared/constants/router.const";
import { Button } from "@/shared/components/button/button.component";
import Link from "next/link";

interface Props {
    onSubmit: () => void;
    isLoading: boolean;
}



const LoginForm = ({ onSubmit, isLoading }: Props) => {
  const Submit = async () => {
    onSubmit();
    // onSubmit(values);
    // console.log(values);
    // const { email, password } = values;
    // await signIn("credentials", {
    //   email,
    //   password,
    //   redirectTo: RouterPath.HOME,
    // });
  };
  return (
    <Form
      name="login"
      // labelCol={{ span: 8 }}
      // wrapperCol={{ span: 16 }}
      // style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={Submit}
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
        <Link href={RouterPath.SIGNUP}> Register</Link>{" "}
        here
      </p>
    </Form>
  );
};

export default LoginForm;