import { GetCustomerByIdResponse } from "@/modules/customers/domain/dto/getCustomer.dto";
import { UpdateCustomerProfilePayload } from "@/modules/customers/domain/dto/updateCustomer.dto";
import { CustomerUseCase } from "@/modules/customers/domain/usecases/customer.usecase";
import { Gender } from "@/shared/constants/gender";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  isShowModal: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  profile: GetCustomerByIdResponse | null;
  onProfileUpdate: () => void;
}

const ModalUpdateInformation = ({
  isShowModal,
  handleOk,
  handleCancel,
  profile,
  onProfileUpdate,
}: Props) => {
  const [form] = useForm();

  const handleOkInternal = async () => {
    try {
      const values = await form.validateFields();
      const customerUseCase = new CustomerUseCase();
      const payload: UpdateCustomerProfilePayload = {
        ...values,
        dob: values.dob ? dayjs(values.dob).format("YYYY-MM-DD") : undefined,
      };

      await customerUseCase.updateCustomerProfile(payload);
      toast.success("Update profile successfully!");

      // await update({
      //   user: {
      //     ...session?.user,
      //     username: values.username,
      //   },
      // });

      await onProfileUpdate();
      handleOk();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Update profile failed!");
    }
  };

  const handleCancelInternal = () => {
    form.resetFields();
    handleCancel();
  };

  useEffect(() => {
    if (isShowModal && profile) {
      form.setFieldsValue({
        email: profile.email,
        username: profile.username,
        postal_code: profile.postal_code,
        gender: profile.gender,
        dob: dayjs(profile.dob),
      });
    }
  }, [isShowModal, profile]);

  return (
    <Modal
      title="Information"
      open={isShowModal}
      onOk={handleOkInternal}
      onCancel={handleCancelInternal}
    >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        form={form}
      >
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Postal Code" name="postal_code">
          <Input />
        </Form.Item>
        <Form.Item label="Gender" name="gender">
          <Select>
            <Select.Option value={Gender.male}>Male</Select.Option>
            <Select.Option value={Gender.female}>Female</Select.Option>
            <Select.Option value={Gender.other}>Other</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="DatePicker" name="dob">
          <DatePicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateInformation;
