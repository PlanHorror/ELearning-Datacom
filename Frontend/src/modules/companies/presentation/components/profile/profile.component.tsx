import { Form, Input } from "antd";
import { Button } from "@/shared/components/button/button.component";

const ProfileComponent = () => {
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Email">
        <Input />
      </Form.Item>
      <Form.Item label="Name">
        <Input />
      </Form.Item>
      <Form.Item label="Address">
        <Input />
      </Form.Item>
      <Button name="Update information"></Button>
      <Button name="Change Password"></Button>
    </Form>
  );
};

export default ProfileComponent;
