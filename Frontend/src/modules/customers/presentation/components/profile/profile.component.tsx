"use client";

import { Card, Col, Row } from "antd";
import styles from "./profile.component.module.scss";
import UserIconComponent from "@/shared/icons/user-icon/user.icon.component";
import { EditOutlined, MailOutlined, RiseOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import { Calendar, Code, Medal, Tickets, VenusAndMars } from "lucide-react";
import { useState } from "react";
import ModalUpdateInformation from "../modal-update-information/modal.update.information.component";

const ProfileComponent = () => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.component_container}>
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
                <UserIconComponent username={""} role={""} />
                {/* just allow to change avatar or username */}
                <EditOutlined />
              </div>
              <div className={styles.user_wrapper}>
                <p className={styles.user_username}>
                  {session?.user?.username}
                </p>
                <p className={styles.user_role}>@{session?.user?.role}</p>
              </div>
            </div>
          </Card>
          <Card hoverable={true}>
            <div className={styles.card_wrapper}>
              <div className={styles.title_wrapper}>
                <h2>Personal Information</h2>
                <EditOutlined onClick={showModal}/>
              </div>
              <div className={styles.information_wrapper}>
                <div className={styles.information}>
                  <MailOutlined />
                  <p>Email</p>
                </div>
                <div className={styles.information}>
                  <Code size={15} />
                  <p>Postal Code</p>
                </div>
                <div className={styles.information}>
                  <VenusAndMars size={15} />
                  <p>Gender</p>
                </div>
                <div className={styles.information}>
                  <Calendar size={15} />
                  <p>Dob</p>
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
          <Card hoverable={true}>
            <div className={styles.right_card_wrapper}>
              <RiseOutlined /> <p className={styles.text}>Progress</p>
            </div>
          </Card>
          <Card hoverable={true}>
            <div className={styles.right_card_wrapper}>
              <Medal size={15} /> <p className={styles.text}>Points</p>
            </div>
          </Card>
          <Card hoverable={true}>
            <div className={styles.right_card_wrapper}>
              <Tickets size={15} /> <p className={styles.text}>Coupons</p>
            </div>
          </Card>
        </Col>
      </Row>
      <ModalUpdateInformation
        isShowModal={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </div>
  );
};

export default ProfileComponent;
