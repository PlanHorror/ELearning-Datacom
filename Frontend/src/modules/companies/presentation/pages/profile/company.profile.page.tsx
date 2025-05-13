"use client";

import styles from "./company.profile.page.module.scss";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoadingComponent } from "@/shared/components/loading/loading.component";
import {
  Card,
  Col,
  Row,
  Tooltip,
  Tabs,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Select,
  Typography,
  Divider,
  List,
  Statistic,
  Switch,
} from "antd";
import UserIconComponent from "@/shared/icons/user-icon/user.icon.component";
import {
  EditOutlined,
  MailOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  HomeOutlined,
  SettingOutlined,
  BellOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import ModalUpdateInformation from "@/modules/companies/presentation/components/modal-update-information/modal.update.information.component";
import ModalCreateCoupon from "@/modules/companies/presentation/components/modal-create-coupon/modal.create.coupon.component";

import { getImageUrl } from "@/utils/image";
import Image from "next/image";
import ModalUpdateCoupon from "@/modules/companies/presentation/components/modal-update-coupon/modal.update.coupon";
import { CompanyProfileResponse } from "@/modules/companies/domain/dto/coupon.dto";
import { CompanyUseCase } from "@/modules/companies/domain/usecases/company.usecase";

// const { TabPane } = Tabs;
const { Option } = Select;
const { Title, Text } = Typography;

interface SettingsFormValues {
  notification: "all" | "important" | "none";
  language: "en" | "jp";
  timezone: "UTC+7" | "UTC+0";
  twoFactorAuth: boolean;
  emailNotifications: boolean;
  darkMode: boolean;
}

const CompanyProfilePage = () => {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isCreateCouponModalOpen, setIsCreateCouponModalOpen] = useState(false);
  const [profile, setProfile] = useState<CompanyProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const [settingsForm] = Form.useForm<SettingsFormValues>();
  const [isUpdateCouponModalOpen, setIsUpdateCouponModalOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  //api get company profile
  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const companyUseCase = new CompanyUseCase();
      const res = await companyUseCase.getCompanyById();
      if (res.status === 200) {
        setProfile(res.data);
      } else {
        toast.error("Get company profile failed!");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Get company profile failed!");
    } finally {
      setIsLoading(false);
    }
  };

  // //api update company profile
  // const updateCompanyProfile = async (data: UpdateCompanyProfilePayload) => {
  //   try {
  //     setIsLoading(true);
  //     const companyUseCase = new CompanyUseCase();
  //     const res = await companyUseCase.updateCompanyProfile(data);

  //     if (res.status === 200) {
  //       setProfile(res.data);
  //     } else {
  //       toast.error("Get company profile failed!");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching profile:", error);
  //     toast.error("Get company profile failed!");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      fetchProfile();
    }
  }, [status]);

  const handleProfileUpdate = async () => {
    await fetchProfile();
  };

  if (status === "loading" || isLoading) {
    return <LoadingComponent />;
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const showSettingsModal = () => {
  //   setIsSettingsModalOpen(true);
  // };

  const handleSettingsOk = () => {
    form.submit();
    setIsSettingsModalOpen(false);
  };

  const handleSettingsCancel = () => {
    setIsSettingsModalOpen(false);
  };

  const handleSettingsSubmit = async (values: SettingsFormValues) => {
    try {
      toast.success("Settings updated successfully");
      setIsSettingsModalOpen(false);
    } catch (error) {
      console.error("Error updating settings:", error);
      toast.error("Failed to update settings");
    }
  };

  const showCreateCouponModal = () => {
    setIsCreateCouponModalOpen(true);
  };

  const handleCreateCouponOk = () => {
    setIsCreateCouponModalOpen(false);
    fetchProfile();
  };

  const handleCreateCouponCancel = () => {
    setIsCreateCouponModalOpen(false);
  };

  const handleCouponCreated = async () => {
    await fetchProfile();
  };

  const handleUpdateCoupon = (couponId: string) => {
    setSelectedCouponId(couponId);
    setIsUpdateCouponModalOpen(true);
  };

  const handleUpdateCouponOk = () => {
    setIsUpdateCouponModalOpen(false);
    fetchProfile();
  };

  const handleUpdateCouponCancel = () => {
    setIsUpdateCouponModalOpen(false);
  };

  const handleDeleteCoupon = (couponId: string) => {
    setSelectedCouponId(couponId);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCouponOk = async () => {
    try {
      const companyUseCase = new CompanyUseCase();
      await companyUseCase.deleteCoupon(selectedCouponId);
      toast.success("Coupon deleted successfully!");
      setIsDeleteModalOpen(false);
      fetchProfile();
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error("Failed to delete coupon!");
    }
  };

  const handleDeleteCouponCancel = () => {
    setIsDeleteModalOpen(false);
  };

  // const couponColumns = [
  //   {
  //     title: "Code",
  //     dataIndex: "code",
  //     key: "code",
  //   },
  //   {
  //     title: "Discount",
  //     dataIndex: "discount",
  //     key: "discount",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //     key: "status",
  //     render: (status: string) => (
  //       <Tag color={status === "active" ? "green" : "red"}>
  //         {status.toUpperCase()}
  //       </Tag>
  //     ),
  //   },
  //   {
  //     title: "Usage Count",
  //     dataIndex: "usageCount",
  //     key: "usageCount",
  //   },
  //   {
  //     title: "Expiry Date",
  //     dataIndex: "expiryDate",
  //     key: "expiryDate",
  //   },
  // ];

  // const popularCoupons = [
  //   {
  //     key: "1",
  //     code: "SUMMER2024",
  //     discount: "20%",
  //     company: "Tech Corp",
  //     expiryDate: "2024-08-31",
  //   },
  //   {
  //     key: "2",
  //     code: "EDU2024",
  //     discount: "15%",
  //     company: "EduTech",
  //     expiryDate: "2024-12-31",
  //   },
  // ];

  // const notices = [
  //   {
  //     id: 1,
  //     title: "New Feature Available",
  //     content: "Coupon analytics dashboard is now available",
  //     date: "2024-04-25",
  //   },
  //   {
  //     id: 2,
  //     title: "System Maintenance",
  //     content: "Scheduled maintenance on May 1st, 2024",
  //     date: "2024-04-20",
  //   },
  // ];

  const items = [
    {
      key: "1",
      label: "Settings",
      icon: <SettingOutlined />,
      children: (
        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title level={4}>Company Information</Title>
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <Text strong>Company Name:</Text>
                  <Text style={{ marginLeft: 8 }}>{profile?.company_name}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Email:</Text>
                  <Text style={{ marginLeft: 8 }}>{profile?.email}</Text>
                </Col>
                <Col span={24}>
                  <Text strong>Address:</Text>
                  <Text style={{ marginLeft: 8 }}>{profile?.address}</Text>
                </Col>
              </Row>
            </div>
            <Button type="primary" onClick={showModal}>
              Update Information
            </Button>
            <Divider />
            <Title level={4}>Account Settings</Title>
            <Form
              form={settingsForm}
              layout="vertical"
              onFinish={handleSettingsSubmit}
              initialValues={{
                notification: "all",
                language: "en",
                timezone: "UTC+7",
                twoFactorAuth: false,
                emailNotifications: true,
                darkMode: false,
              }}
            >
              <Row gutter={[24, 16]}>
                <Col span={12}>
                  <Form.Item
                    name="notification"
                    label="Notification Settings"
                    tooltip="Choose how you want to receive notifications"
                  >
                    <Select>
                      <Select.Option value="all">
                        All Notifications
                      </Select.Option>
                      <Select.Option value="important">
                        Important Only
                      </Select.Option>
                      <Select.Option value="none">None</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="language"
                    label="Language"
                    tooltip="Select your preferred language"
                  >
                    <Select>
                      <Select.Option value="en">English</Select.Option>
                      <Select.Option value="vi">Vietnamese</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="timezone"
                    label="Timezone"
                    tooltip="Set your local timezone"
                  >
                    <Select>
                      <Select.Option value="UTC+7">
                        UTC+7 (Vietnam)
                      </Select.Option>
                      <Select.Option value="UTC+0">UTC+0 (GMT)</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="twoFactorAuth"
                    label="Two-Factor Authentication"
                    tooltip="Enable 2FA for additional security"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="emailNotifications"
                    label="Email Notifications"
                    tooltip="Receive notifications via email"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="darkMode"
                    label="Dark Mode"
                    tooltip="Enable dark mode for better visibility"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Save Settings
                </Button>
              </Form.Item>
            </Form>
            <Divider />
            <Title level={4}>Security</Title>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              <Button type="primary" danger onClick={() => {}}>
                Change Password
              </Button>
              <Button type="default" onClick={() => {}}>
                Manage Active Sessions
              </Button>
              <Button type="default" onClick={() => {}}>
                Manage API Keys
              </Button>
            </Space>
          </Space>
        </Card>
      ),
    },
    {
      key: "2",
      label: "Coupons",
      icon: <GiftOutlined />,
      children: (
        <Card>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            <div>
              <Title level={4}>Coupon Statistics</Title>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Total Coupons"
                      value={profile?.coupons?.length || 0}
                      prefix={<GiftOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Active Coupons"
                      value={
                        profile?.coupons?.filter(
                          (c: any) => c.status === "active"
                        ).length || 0
                      }
                      prefix={<GiftOutlined />}
                    />
                  </Card>
                </Col>
                <Col span={8}>
                  <Card>
                    <Statistic
                      title="Expired Coupons"
                      value={
                        profile?.coupons?.filter(
                          (c: any) => c.status === "expired"
                        ).length || 0
                      }
                      prefix={<GiftOutlined />}
                    />
                  </Card>
                </Col>
              </Row>
            </div>
            <Button type="primary" onClick={showCreateCouponModal}>
              Register New Coupon
            </Button>
            <Divider />
            <Title level={4}>Your Coupons</Title>
            <List
              grid={{ gutter: 16, column: 3 }}
              dataSource={profile?.coupons || []}
              renderItem={(coupon: any) => (
                <List.Item>
                  <Card
                    cover={
                      <Image
                        alt={coupon.title}
                        src={getImageUrl(coupon.image)}
                        style={{ objectFit: "cover" }}
                        width={200}
                        height={200}
                      />
                    }
                    actions={[
                      <Button
                        type="link"
                        key="edit"
                        onClick={() => handleUpdateCoupon(coupon.id)}
                      >
                        Edit
                      </Button>,
                      <Button
                        type="link"
                        danger
                        key="delete"
                        onClick={() => handleDeleteCoupon(coupon.id)}
                      >
                        Delete
                      </Button>,
                    ]}
                  >
                    <Card.Meta
                      title={
                        <Space>
                          {coupon.title}
                          <Tag
                            color={coupon.status === "Active" ? "green" : "red"}
                          >
                            {coupon.status}
                          </Tag>
                        </Space>
                      }
                      description={
                        <Space direction="vertical">
                          <Text>Code: {coupon.use_code}</Text>
                          <Text>Points: {coupon.use_point}</Text>
                          <Text>
                            EXP: {dayjs(coupon.period_end).format("YYYY/MM/DD")}
                          </Text>
                        </Space>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          </Space>
        </Card>
      ),
    },
    {
      key: "3",
      label: "Notices",
      icon: <BellOutlined />,
      children: (
        <Card>
          <Title level={4}>System Notices</Title>
          <List
            dataSource={[
              {
                title: "System Maintenance",
                content:
                  "The system will be under maintenance on 2024-04-30 from 2:00 AM to 4:00 AM.",
                date: "2024-04-25",
              },
              {
                title: "New Feature Release",
                content:
                  "We have added new features to the coupon management system.",
                date: "2024-04-20",
              },
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={
                    <Space direction="vertical">
                      <Text>{item.content}</Text>
                      <Text type="secondary">{item.date}</Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      ),
    },
  ];

  return (
    <div className={styles.page_container}>
      <div className={styles.page_wrapper}>
        <div className={styles.title_page_wrapper}>
          <p className={styles.sub_title}>Profile</p>
          <h1 className={styles.title}>Company Profile</h1>
        </div>
        <div className={styles.component_container}>
          <div className={styles.component_main}>
            <Row className={styles.component_wrapper} gutter={[30, 20]}>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={8}
                xl={8}
                xxl={8}
                className={styles.left_col}
              >
                <Card hoverable={true}>
                  <div className={styles.card_wrapper}>
                    <div className={styles.title_wrapper}>
                      <UserIconComponent
                        username={profile?.company_name || ""}
                        role={session?.user?.role || ""}
                      />
                      <EditOutlined onClick={showModal} />
                    </div>
                    <div className={styles.user_wrapper}>
                      <p className={styles.user_username}>
                        {profile?.company_name}
                      </p>
                      <p className={styles.user_role}>@{session?.user?.role}</p>
                      <div className={styles.user_stats}>
                        <Tooltip title="Member since">
                          <span>
                            <ClockCircleOutlined />{" "}
                            {dayjs(profile?.created_at).format("MMM YYYY")}
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card hoverable={true}>
                  <div className={styles.card_wrapper}>
                    <div className={styles.title_wrapper}>
                      <h2>Personal Information</h2>
                      <EditOutlined onClick={showModal} />
                    </div>
                    <div className={styles.information_wrapper}>
                      <div className={styles.information}>
                        <MailOutlined />
                        <p>{profile?.email}</p>
                      </div>
                      <div className={styles.information}>
                        <TeamOutlined size={15} />
                        <p>{profile?.company_name}</p>
                      </div>
                      <div className={styles.information}>
                        <HomeOutlined size={15} />
                        <p>{profile?.address}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col
                xs={24}
                sm={24}
                md={12}
                lg={16}
                xl={16}
                xxl={16}
                className={styles.right_col}
              >
                <Tabs
                  activeKey={activeTab}
                  onChange={setActiveTab}
                  items={items}
                  size="large"
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>

      <ModalUpdateInformation
        isShowModal={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        profile={profile}
        onProfileUpdate={handleProfileUpdate}
      />

      <ModalCreateCoupon
        isShowModal={isCreateCouponModalOpen}
        handleOk={handleCreateCouponOk}
        handleCancel={handleCreateCouponCancel}
        onCouponCreated={handleCouponCreated}
      />

      <ModalUpdateCoupon
        isShowModal={isUpdateCouponModalOpen}
        handleSave={handleUpdateCouponOk}
        handleCancel={handleUpdateCouponCancel}
        couponId={selectedCouponId}
      />

      <Modal
        title="Delete Coupon"
        open={isDeleteModalOpen}
        onOk={handleDeleteCouponOk}
        onCancel={handleDeleteCouponCancel}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this coupon?</p>
      </Modal>

      <Modal
        title="Company Settings"
        open={isSettingsModalOpen}
        onOk={handleSettingsOk}
        onCancel={handleSettingsCancel}
      >
        <Form form={form} layout="vertical" onFinish={handleSettingsSubmit}>
          <Form.Item name="notification" label="Notification Settings">
            <Select defaultValue="all">
              <Option value="all">All Notifications</Option>
              <Option value="important">Important Only</Option>
              <Option value="none">None</Option>
            </Select>
          </Form.Item>
          <Form.Item name="language" label="Language">
            <Select defaultValue="en">
              <Option value="en">English</Option>
              <Option value="jp">Japanese</Option>
            </Select>
          </Form.Item>
          <Form.Item name="timezone" label="Timezone">
            <Select defaultValue="UTC+7">
              <Option value="UTC+7">UTC+9 (Japan)</Option>
              <Option value="UTC+0">UTC+0 (GMT)</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CompanyProfilePage;
