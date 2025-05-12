import { getImageUrl } from "@/utils/image";
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
import type { UploadFile } from "antd/es/upload/interface";
import { useForm } from "antd/es/form/Form";
import { UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import dayjs from "dayjs";
import { CompanyUseCase } from "@/modules/companies/domain/usecases/company.usecase";
import { UpdateCouponPayload } from "@/modules/companies/domain/dto/coupon.dto";

interface Props {
  isShowModal: boolean;
  handleSave: () => void;
  handleCancel: () => void;
  couponId: string;
}

const UpdateCouponModal = ({
  isShowModal,
  handleSave,
  handleCancel,
  couponId,
}: Props) => {
  const [form] = useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [listLabel, setListLabel] = useState<{ id: string; label: string }[]>(
    []
  );

  const getInformationCoupon = async () => {
    try {
      const companyUseCase = new CompanyUseCase();
      const res = await companyUseCase.getInformationCoupon(couponId);
      if (!res) throw new Error("Failed to get information of coupon!");

      const couponData = res.data;
      form.setFieldsValue({
        title: couponData.title,
        use_code: couponData.use_code,
        detail: couponData.detail,
        use_point: couponData.use_point,
        period_start: dayjs(couponData.period_start),
        period_end: dayjs(couponData.period_end),
        classification: couponData.classification,
        label: couponData.label,
        comment: couponData.comment,
      });

      if (couponData.image) {
        setFileList([
          {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: getImageUrl(couponData.image),
          },
        ]);
      }

      toast.success("Get information coupon successfully!");
    } catch (error) {
      console.error("Error getting coupon information:", error);
      toast.error("Failed to get information of coupon!");
    }
  };

  const updateCoupon = async (payload: UpdateCouponPayload) => {
    try {
      const companyUseCase = new CompanyUseCase();
      const res = await companyUseCase.updateCoupon(couponId, payload);
      if (!res) throw new Error("Failed to update coupon!");
      toast.success("Update coupon successfully!");
      handleSave();
    } catch (error) {
      throw error;
      toast.error("Failed to update coupon!");
    }
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

  const handleSaveInternal = async () => {
    try {
      const values = await form.validateFields();

      const payload: UpdateCouponPayload = {
        ...values,
        period_start: values.period_start.format("YYYY-MM-DD"),
        period_end: values.period_end.format("YYYY-MM-DD"),
      };

      if (fileList.length > 0 && fileList[0]?.originFileObj) {
        payload.image = fileList[0].originFileObj;
      }

      await updateCoupon(payload);
    } catch (error) {
      console.error("Error updating coupon:", error);
      toast.error("Failed to update coupon!");
    }
  };

  const handleCancelInternal = () => {
    form.resetFields();
    setFileList([]);
    handleCancel();
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (info: any) => {
    setFileList(info.fileList);
  };

  useEffect(() => {
    if (isShowModal && couponId) {
      getInformationCoupon();
      getListLabel();
    }
  }, [isShowModal, couponId]);

  return (
    <Modal
      title="Update Coupon"
      open={isShowModal}
      onOk={handleSaveInternal}
      onCancel={handleCancelInternal}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          classification: "Coupon",
          label: "New",
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
            <Select.Option value="Discount">Present</Select.Option>
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

export default UpdateCouponModal;
