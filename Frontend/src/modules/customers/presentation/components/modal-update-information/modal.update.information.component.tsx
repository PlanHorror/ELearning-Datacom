import { Gender } from "@/shared/constants/gender";
import { DatePicker, Form, Input, Modal, Select } from "antd";
import { useSession } from "next-auth/react";

interface Props {
  isShowModal: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const ModalUpdateInformation = ({
  isShowModal,
  handleOk,
  handleCancel,
}: Props) => {
  const { data: session } = useSession();
  return (
    <Modal
      title="Information"
      open={isShowModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {session?.user?.role === "Customer" ? (
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Email">
            <Input />
          </Form.Item>
          <Form.Item label="Username">
            <Input />
          </Form.Item>
          <Form.Item label="Postal Code">
            <Input />
          </Form.Item>
          <Form.Item label="Gender">
            <Select>
              <Select.Option value={Gender.male}>Male</Select.Option>
              <Select.Option value={Gender.female}>Female</Select.Option>
              <Select.Option value={Gender.other}>Other</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="DatePicker">
            <DatePicker />
          </Form.Item>
        </Form>
      ) : (
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
        </Form>
      )}
    </Modal>
  );
};

export default ModalUpdateInformation;
