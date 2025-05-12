import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
  message,
  Button,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { CreateCouponPayload } from "@/modules/companies/domain/dto/coupon.dto";
import { CompanyUseCase } from "@/modules/companies/domain/usecases/company.usecase";

interface Props {
  isShowModal: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  onCouponCreated: () => void;
}

const ModalCreateCoupon = ({
  isShowModal,
  handleOk,
  handleCancel,
  onCouponCreated,
}: Props) => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [listLabel, setListLabel] = useState<{ id: string; label: string }[]>(
    []
  );
  const handleOkInternal = async () => {
    try {
      const values = await form.validateFields();

      if (!fileList.length) {
        message.error("Please upload a coupon image!");
        return;
      }

      const payload: CreateCouponPayload = {
        ...values,
        period_start: values.period_start.format("YYYY-MM-DD"),
        period_end: values.period_end.format("YYYY-MM-DD"),
        image: fileList[0]?.originFileObj,
      };

      const companyUseCase = new CompanyUseCase();
      await companyUseCase.createCoupon(payload);
      toast.success("Coupon created successfully!");
      onCouponCreated();
      handleOk();
    } catch (error) {
      console.error("Error creating coupon:", error);
      toast.error("Failed to create coupon!");
    }
  };

  const handleCancelInternal = () => {
    form.resetFields();
    setFileList([]);
    handleCancel();
  };

  const getListLabel = async () => {
    try {
      const companyUseCase = new CompanyUseCase();
      const res = await companyUseCase.getListLabel();
      setListLabel(res.data);
    } catch (error) {
      throw error;
      toast.error("Failed to get list label!");
    }
  };

  useEffect(() => {
    getListLabel();
    if (isShowModal) {
      form.resetFields();
      setFileList([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowModal]);

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return Upload.LIST_IGNORE;
    }
    return false;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (info: any) => {
    setFileList(info.fileList);
  };

  return (
    <Modal
      title="Create New Coupon"
      open={isShowModal}
      onOk={handleOkInternal}
      onCancel={handleCancelInternal}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          classification: "Coupon",
          label: "new",
        }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input coupon title!" }]}
        >
          <Input placeholder="Enter coupon title" />
        </Form.Item>

        <Form.Item
          name="use_code"
          label="Coupon Code"
          rules={[{ required: true, message: "Please input coupon code!" }]}
        >
          <Input placeholder="Enter coupon code" />
        </Form.Item>

        <Form.Item
          name="detail"
          label="Details"
          rules={[{ required: true, message: "Please input coupon details!" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter coupon details" />
        </Form.Item>

        <Form.Item
          name="use_point"
          label="Points Required"
          rules={[{ required: true, message: "Please input points required!" }]}
        >
          <InputNumber
            min={0}
            style={{ width: "100%" }}
            placeholder="Enter points required"
          />
        </Form.Item>

        <Form.Item
          name="period_start"
          label="Start Date"
          rules={[{ required: true, message: "Please select start date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="period_end"
          label="End Date"
          rules={[{ required: true, message: "Please select end date!" }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="classification"
          label="Classification"
          rules={[{ required: true, message: "Please select classification!" }]}
        >
          <Select>
            <Select.Option value="Coupon">Coupon</Select.Option>
            <Select.Option value="Discount">Discount</Select.Option>
            <Select.Option value="Special">Special</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="label"
          label="Label"
          rules={[{ required: true, message: "Please select label!" }]}
        >
          <Select>
            {listLabel.map((label) => (
              <Select.Option key={label.id} value={label.label}>
                {label.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Coupon Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e?.fileList;
          }}
          rules={[{ required: true, message: "Please upload a coupon image!" }]}
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            fileList={fileList}
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="comment" label="Comment">
          <Input.TextArea
            rows={2}
            placeholder="Enter any additional comments"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalCreateCoupon;
