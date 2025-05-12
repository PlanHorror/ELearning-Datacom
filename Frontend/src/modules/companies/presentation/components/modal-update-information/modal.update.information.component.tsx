import { CompanyProfileResponse } from "@/modules/companies/domain/dto/coupon.dto";
import { CompanyUseCase } from "@/modules/companies/domain/usecases/company.usecase";
import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { toast } from "sonner";

interface Props {
  isShowModal: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  profile: CompanyProfileResponse | null;
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
      const companyUseCase = new CompanyUseCase();
      await companyUseCase.updateCompanyProfile(values);
      toast.success("Update profile successfully!");
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
        company_name: profile.company_name,
        address: profile.address,
      });
    }
  }, [isShowModal, profile]);

  return (
    <Modal
      title="Company Information"
      open={isShowModal}
      onOk={handleOkInternal}
      onCancel={handleCancelInternal}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        form={form}
      >
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="Company Name"
          name="company_name"
          rules={[
            { required: true, message: "Please input your company name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your address!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalUpdateInformation;
