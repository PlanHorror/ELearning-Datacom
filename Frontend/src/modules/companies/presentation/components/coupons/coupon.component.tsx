import { DatePicker, Form, Input } from "antd";
import { Button } from "@/shared/components/button/button.component";

const CouponComponent = () => {
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Title">
        <Input />
      </Form.Item>
      <Form.Item label="Period Start">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Period End">
        <DatePicker />
      </Form.Item>
      <Form.Item label="Points">
        <Input />
      </Form.Item>
      <Form.Item label="Code">
        <Input />
      </Form.Item>
      <Form.Item label="Details">
        <Input />
      </Form.Item>
      <Form.Item label="Comment">
        <Input />
      </Form.Item>
      <Form.Item label="Label">
        <Input />
      </Form.Item>
      <Button name="Create"></Button>
    </Form>
  );
};

export default CouponComponent;
