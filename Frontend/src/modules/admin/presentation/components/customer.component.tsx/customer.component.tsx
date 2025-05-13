"use client";

import {
  CustomerInput,
  SingleCustomerResponse,
} from "@/modules/admin/domain/dto/customer.dto";
import { CustomerService } from "@/modules/admin/services/customer.service";
import { AccountStatus } from "@/shared/constants/account-status";
import { Gender } from "@/shared/constants/gender";
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Table,
} from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "./customer.component.module.scss";
import { redirect, RedirectType } from "next/navigation";

const CustomerComponent = ({ id }: { id: string }) => {
  const [customer, setCustomer] = useState<
    SingleCustomerResponse | null | undefined
  >(null);
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await CustomerService.getInstance().getCustomerById(
          id
        );
        await setCustomer(response);
      } catch (error) {
        if (error.status === 404) {
          setCustomer(undefined);
        }
      }
    };
    fetchCustomer();
  }, [id]);

  const onFinish = async (values: any) => {
    const data: CustomerInput = {
      email: values.email,
      username: values.username,
      postal_code: values.postal_code,
      prefecture: values.prefecture,
      gender: values.gender,
      dob: values.dob,
      points: values.points,
      status: values.status,
    };
    try {
      await CustomerService.getInstance().updateCustomer(id, data);
      return redirect("dashboard/customers", RedirectType.replace);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };
  const favouritesColumn = [
    {
      field: "coupon.title",
      title: "Title",

      key: "coupon.title",
      dataIndex: "coupon.title",
      render: (_, record) => record.coupon.title,
    },
    {
      field: "created_at",
      title: "Created At",
      key: "created_at",
      dataIndex: "created_at",
      render: (_, record) =>
        record.created_at
          ? dayjs(record.created_at).format("YYYY-MM-DD HH:mm:ss")
          : "-",
    },
    {
      field: "updated_at",
      title: "Last Updated",
      key: "updated_at",
      dataIndex: "updated_at",
      render: (_, record) =>
        record.updated_at
          ? dayjs(record.updated_at).format("YYYY-MM-DD HH:mm:ss")
          : "-",
    },
  ];
  const pointsHistoryColumn = [
    {
      field: "points",
      title: "Points",
      key: "points",
      dataIndex: "points",
      render: (_, record) => record.points,
    },
    {
      field: "type",
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (_, record) => record.type,
    },
    {
      field: "description",
      title: "Description",
      key: "description",
      dataIndex: "description",
      render: (_, record) => record.description,
    },
    {
      field: "created_at",
      title: "Created At",
      key: "created_at",
      dataIndex: "created_at",
      render: (_, record) =>
        record.created_at
          ? dayjs(record.created_at).format("YYYY-MM-DD HH:mm:ss")
          : "-",
    },
    {
      field: "updated_at",
      title: "Last Updated",
      key: "updated_at",
      dataIndex: "updated_at",
      render: (_, record) =>
        record.updated_at
          ? dayjs(record.updated_at).format("YYYY-MM-DD HH:mm:ss")
          : "-",
    },
  ];
  const couponUsagesColumn = [
    {
      field: "coupon.title",
      title: "Coupon Title",
      key: "coupon.title",
      dataIndex: "coupon.title",
      render: (_, record) => record.coupon.title,
    },
    {
      field: "status",
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      field: "created_at",
      title: "Created At",
      key: "created_at",
      dataIndex: "created_at",
      render: (_, record) =>
        record.created_at
          ? dayjs(record.created_at).format("YYYY-MM-DD HH:mm:ss")
          : "-",
    },
    {
      field: "updated_at",
      title: "Last Updated",
      key: "updated_at",
      dataIndex: "updated_at",
      render: (_, record) =>
        record.updated_at
          ? dayjs(record.updated_at).format("YYYY-MM-DD HH:mm:ss")
          : "-",
    },
  ];
  const learningStatusColumn = [
    {
      field: "lessonId",
      title: "Lesson ID",
      key: "lessonId",
      dataIndex: "lessonId",
    },
    {
      field: "date",
      title: "Date",
      key: "date",
      dataIndex: "date",
      render: (_, record) =>
        record.date ? dayjs(record.date).format("YYYY-MM-DD") : "-",
    },
    {
      field: "time",
      title: "Time",
      key: "time",
      dataIndex: "time",
      render: (_, record) =>
        record.time ? dayjs(record.time).format("HH:mm:ss") : "-",
    },
    {
      field: "completion",
      title: "Completion",
      key: "completion",
      dataIndex: "completion",
      render: (_, record) =>
        record.completion ? "Completed" : "Not Completed",
    },
    {
      field: "created_at",
      title: "Created At",
      key: "created_at",
      dataIndex: "created_at",
      render: (_, record) =>
        record.created_at
          ? dayjs(record.created_at).format("YYYY-MM-DD HH:mm:ss")
          : "-",
    },
    {
      field: "last_updated",
      title: "Last Updated",
      key: "last_updated",
      dataIndex: "last_updated",
      render: (_, record) =>
        record.last_updated
          ? dayjs(record.updated_at).format("YYYY-MM-DD HH:mm:ss")
          : "-",
    },
  ];
  return (
    <div className="h-full">
      {customer ? (
        <div>
          <Card
            title="Customer Details"
            className={styles.card}
            style={{ marginBottom: "20px" }}>
            <Form layout="vertical" className={styles.form} onFinish={onFinish}>
              <Form.Item
                label="Email"
                name={"email"}
                rules={[{ required: true, message: "Please input email!" }]}
                initialValue={customer.email}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Username"
                name={"username"}
                rules={[{ required: true, message: "Please input username!" }]}
                initialValue={customer.username}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Postal Code"
                name={"postal_code"}
                rules={[
                  { required: true, message: "Please input postal code!" },
                ]}
                initialValue={customer.postal_code}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Prefecture"
                name={"prefecture"}
                rules={[
                  { required: true, message: "Please input prefecture!" },
                ]}
                initialValue={customer.prefecture}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Gender"
                name={"gender"}
                rules={[{ required: true, message: "Please input gender!" }]}
                initialValue={customer.gender}>
                <Select
                  options={[
                    {
                      value: Gender.male,
                      label: Gender.male,
                    },
                    {
                      value: Gender.female,
                      label: Gender.female,
                    },
                    {
                      value: Gender.other,
                      label: Gender.other,
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[
                  { required: true, message: "Please input date of birth!" },
                ]}
                initialValue={dayjs(customer.dob)}
                labelCol={{ className: styles.form_date_picker }}>
                <DatePicker
                  className={styles.form_date_picker}
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                label="Points"
                name={"points"}
                rules={[{ required: true, message: "Please input points!" }]}
                initialValue={customer.points}>
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder="Enter points"
                  value={customer.points}
                  name="points"
                />
              </Form.Item>
              <Form.Item
                label="Status"
                name={"status"}
                rules={[{ required: true, message: "Please input status!" }]}
                initialValue={customer.status}>
                <Select
                  options={[
                    {
                      value: AccountStatus.ACTIVE,
                      label: AccountStatus.ACTIVE,
                    },
                    {
                      value: AccountStatus.INACTIVE,
                      label: AccountStatus.INACTIVE,
                    },
                    {
                      value: AccountStatus.BANNED,
                      label: AccountStatus.BANNED,
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={styles.submitButton}>
                  Update
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card
            title="Favourites"
            className={styles.card}
            style={{ marginBottom: "20px" }}>
            <ul>
              {customer.favourites.length > 0 ? (
                <Table
                  columns={favouritesColumn}
                  dataSource={customer.favourites}
                  pagination={false}
                  rowKey="id"
                  className={styles.table}
                  scroll={{ x: 1300 }}
                />
              ) : (
                <p className={styles.notFound}> No favourites found</p>
              )}
            </ul>
          </Card>
          <Card
            title="Points History"
            className={styles.card}
            style={{ marginBottom: "20px" }}>
            <div>
              {customer.pointsHistories.length > 0 ? (
                <Table
                  columns={pointsHistoryColumn}
                  dataSource={customer.pointsHistories}
                  pagination={false}
                  rowKey="id"
                  className={styles.table}
                  scroll={{ x: 1300 }}
                />
              ) : (
                <p className={styles.notFound}>No points history found</p>
              )}
            </div>
          </Card>
          <Card
            title="Coupon Usages"
            className={styles.card}
            style={{ marginBottom: "20px" }}>
            <div>
              {customer.couponUsages.length > 0 ? (
                <Table
                  columns={couponUsagesColumn}
                  dataSource={customer.couponUsages}
                  pagination={false}
                  rowKey="id"
                  className={styles.table}
                  scroll={{ x: 1300 }}
                />
              ) : (
                <p className={styles.notFound}>No coupon usages found</p>
              )}
            </div>
          </Card>
          <Card title="Learning Status" className={styles.card}>
            <div>
              {customer.learningStatus.length > 0 ? (
                <Table
                  columns={learningStatusColumn}
                  dataSource={customer.learningStatus}
                  pagination={false}
                  rowKey="id"
                  className={styles.table}
                  scroll={{ x: 1300 }}
                />
              ) : (
                <p className={styles.notFound}>No learning status found</p>
              )}
            </div>
          </Card>
        </div>
      ) : customer === undefined ? (
        <p>Customer not found</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default CustomerComponent;
