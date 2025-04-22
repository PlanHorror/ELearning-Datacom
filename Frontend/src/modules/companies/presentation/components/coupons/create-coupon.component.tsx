"use client";

import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import { CreateCouponPayload } from "../../domain/dto/coupon.dto";
import { CouponService } from "../../services/coupon.service";
import { useState } from "react";
import dayjs from "dayjs";

const { Option } = Select;

export const CreateCouponForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const payload: CreateCouponPayload = {
        ...values,
        startDate: values.dateRange[0].format("YYYY-MM-DD"),
        endDate: values.dateRange[1].format("YYYY-MM-DD"),
      };
      delete payload.dateRange;

      const response = await CouponService.getInstance().createCoupon(payload);
      message.success(response.message);
      form.resetFields();
    } catch (error) {
      message.error("Failed to create coupon");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        name="code"
        label="Coupon Code"
        rules={[{ required: true, message: "Please input coupon code!" }]}
      >
        <Input placeholder="Enter coupon code" />
      </Form.Item>

      <Form.Item
        name="type"
        label="Discount Type"
        rules={[{ required: true, message: "Please select discount type!" }]}
      >
        <Select placeholder="Select discount type">
          <Option value="percentage">Percentage</Option>
          <Option value="fixed">Fixed Amount</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="discount"
        label="Discount Value"
        rules={[{ required: true, message: "Please input discount value!" }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          min={0}
          placeholder="Enter discount value"
        />
      </Form.Item>

      <Form.Item
        name="dateRange"
        label="Valid Period"
        rules={[{ required: true, message: "Please select valid period!" }]}
      >
        <DatePicker.RangePicker
          style={{ width: "100%" }}
          disabledDate={(current) => {
            return current && current < dayjs().startOf("day");
          }}
        />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: "Please input description!" }]}
      >
        <Input.TextArea rows={4} placeholder="Enter coupon description" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} block>
          Create Coupon
        </Button>
      </Form.Item>
    </Form>
  );
};
