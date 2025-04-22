"use client";

import { Card, Col, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Point, PointHistory } from "../../domain/dto/point.dto";
import { LoadingComponent } from "@/shared/components/loading/loading.component";
import { useSession } from "next-auth/react";
import { Medal, History } from "lucide-react";
import styles from "./point.component.module.scss";
import dayjs from "dayjs";

// Mock data
const mockPoints: Point = {
  totalPoints: 1000,
  availablePoints: 750,
  usedPoints: 250,
};

const mockHistory: PointHistory[] = [
  {
    id: "1",
    points: 100,
    type: "EARN",
    description: "Completed course 'Math'",
    createdAt: "2025-04-15T10:30:00Z",
    status: "COMPLETED",
  },
  {
    id: "2",
    points: -50,
    type: "SPEND",
    description: "Redeemed coupon for 'Datacom Summer'",
    createdAt: "2025-04-14T15:45:00Z",
    status: "COMPLETED",
  },
  {
    id: "3",
    points: 200,
    type: "EARN",
    description: "Completed course 'History'",
    createdAt: "2025-04-13T09:20:00Z",
    status: "COMPLETED",
  },
  {
    id: "4",
    points: -100,
    type: "SPEND",
    description: "Redeemed coupon for 'Datacom Merry Christmas'",
    createdAt: "2025-04-12T14:10:00Z",
    status: "COMPLETED",
  },
  {
    id: "5",
    points: 150,
    type: "EARN",
    description: "Completed course 'English'",
    createdAt: "2025-04-11T11:30:00Z",
    status: "COMPLETED",
  },
  {
    id: "6",
    points: 300,
    type: "EARN",
    description: "Completed course 'Japanese'",
    createdAt: "2025-04-10T16:20:00Z",
    status: "COMPLETED",
  },
  {
    id: "7",
    points: -75,
    type: "SPEND",
    description: "Redeemed coupon for 'Coupons of Datacom'",
    createdAt: "2025-04-09T13:45:00Z",
    status: "COMPLETED",
  },
  {
    id: "8",
    points: 250,
    type: "EARN",
    description: "Completed course 'English'",
    createdAt: "2025-04-08T10:15:00Z",
    status: "COMPLETED",
  },
  {
    id: "9",
    points: -125,
    type: "SPEND",
    description: "Redeemed coupon for '50% Fresh Food'",
    createdAt: "2025-04-07T15:30:00Z",
    status: "COMPLETED",
  },
  {
    id: "10",
    points: 175,
    type: "EARN",
    description: "Completed course 'Physical'",
    createdAt: "2025-04-06T09:40:00Z",
    status: "COMPLETED",
  },
];

const PointComponent = () => {
  const { status } = useSession();
  const [points, setPoints] = useState<Point | null>(null);
  const [history, setHistory] = useState<PointHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPoints(mockPoints);
      setHistory(mockHistory);
    } catch (error) {
      console.error("Error fetching point data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchData();
    }
  }, [status]);

  const columns = [
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      render: (points: number) => (
        <span className={points > 0 ? styles.earn : styles.spend}>
          {points > 0 ? `+${points}` : points}
        </span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === "EARN" ? "green" : "red"}>{type}</Tag>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "COMPLETED"
              ? "green"
              : status === "PENDING"
              ? "orange"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD HH:mm"),
    },
  ];

  if (status === "loading" || isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className={styles.component_container}>
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={24} md={8}>
          <Card title="Total Points" className={styles.point_card}>
            <div className={styles.point_content}>
              <Medal size={24} />
              <span className={styles.point_value}>
                {points?.totalPoints || 0}
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card title="Available Points" className={styles.point_card}>
            <div className={styles.point_content}>
              <Medal size={24} />
              <span className={styles.point_value}>
                {points?.availablePoints || 0}
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card title="Used Points" className={styles.point_card}>
            <div className={styles.point_content}>
              <Medal size={24} />
              <span className={styles.point_value}>
                {points?.usedPoints || 0}
              </span>
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title={
              <div className={styles.history_title}>
                <History size={20} />
                <span>Point History</span>
              </div>
            }
            className={styles.point_card}
          >
            <div className={styles.table_container}>
              <Table
                dataSource={history}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
                className={styles.table_header}
              />
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PointComponent;
