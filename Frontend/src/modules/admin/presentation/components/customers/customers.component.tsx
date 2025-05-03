"use client";
import { MultiCustomerResponse } from "@/modules/admin/domain/dto/customer.dto";
import { CustomerService } from "@/modules/admin/services/customer.service";
import { Button, Card, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  StopOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const CustomersComponent = () => {
  const [customers, setCustomers] = useState<MultiCustomerResponse[]>([]);
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await CustomerService.getInstance().getCustomers();
        setCustomers(response);
        console.log("Customers:", response);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);
  const column = [
    {
      field: "email",
      title: "Email",
      width: 150,
      key: "email",
      dataIndex: "email",
      fixed: "left",
    },
    {
      field: "username",
      title: "Username",
      width: 150,
      key: "username",
      dataIndex: "username",
    },
    {
      field: "postal_code",
      title: "Postal Code",
      width: 150,
      key: "postal_code",
      dataIndex: "postal_code",
    },
    {
      field: "prefecture",
      title: "Prefecture",
      width: 150,
      key: "prefecture",
      dataIndex: "prefecture",
    },
    {
      field: "gender",
      title: "Gender",
      width: 100,
      key: "gender",
      dataIndex: "gender",
    },
    {
      field: "dob",
      title: "Date of Birth",
      width: 150,
      key: "dob",
      dataIndex: "dob",
      render: (text: string) => {
        return dayjs(text).format("YYYY-MM-DD");
      },
    },
    {
      field: "points",
      title: "Points",
      width: 100,
      key: "points",
      dataIndex: "points",
    },
    {
      field: "status",
      title: "Status",
      width: 150,
      key: "status",
      dataIndex: "status",
      render: (text: string) => {
        return text.toLowerCase() === "active" ? (
          <CheckCircleOutlined style={{ color: "green" }} />
        ) : text.toLowerCase() === "inactive" ? (
          <CloseCircleOutlined style={{ color: "orange" }} />
        ) : (
          <StopOutlined style={{ color: "red" }} />
        );
      },
    },
    {
      field: "created_at",
      title: "Created At",
      width: 150,
      key: "created_at",
      dataIndex: "created_at",
      render: (text: string) => {
        return dayjs(text).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      field: "last_updated",
      title: "Last Updated",
      width: 150,
      key: "last_updated",
      dataIndex: "last_updated",
      render: (text: string) => {
        return dayjs(text).format("YYYY-MM-DD HH:mm:ss");
      },
    },
    {
      field: "last_login",
      title: "Last Login",
      width: 150,
      key: "last_login",
      dataIndex: "last_login",
      render: (text: string) => {
        return dayjs(text).format("YYYY-MM-DD HH:mm:ss")
          ? dayjs(text).format("YYYY-MM-DD HH:mm:ss")
          : "-";
      },
    },
    {
      field: "actions",
      title: "Actions",
      width: 80,
      key: "actions",
      dataIndex: "id",
      fixed: "right",
      render: (id: string) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Link href={`/dashboard/customers/${id}`}>
              <EditOutlined style={{ color: "blue" }} />{" "}
            </Link>
            <DeleteOutlined
              style={{ color: "red" }}
              onClick={() => {
                alert("Are you sure you want to delete this customer?");
                console.log("Delete customer with ID" + id);
              }}
            />
          </div>
        );
      },
    },
  ];
  return (
    <div style={{ maxWidth: "70vw" }}>
      <Card title="Customers">
        <div>
          <Table
            dataSource={customers}
            columns={column}
            rowKey={"id"}
            scroll={{
              x: "100%",
            }}
          />
        </div>{" "}
      </Card>
    </div>
  );
};
export default CustomersComponent;
