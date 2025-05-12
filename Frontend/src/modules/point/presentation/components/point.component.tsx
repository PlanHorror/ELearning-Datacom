"use client";

import { Card, Col, Row, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Point, PointHistory } from "../../domain/dto/point.dto";
import { LoadingComponent } from "@/shared/components/loading/loading.component";
import { useSession } from "next-auth/react";
import { Medal, History } from "lucide-react";
import styles from "./point.component.module.scss";
import dayjs from "dayjs";
import { PointUseCase } from "../../domain/usecase/point.usecase";

const PointComponent = () => {
  const { status } = useSession();
  const [points, setPoints] = useState<Point | null>(null);
  const [history, setHistory] = useState<PointHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPointHistory = async () => {
    try {
      setIsLoading(true);
      const pointUseCase = new PointUseCase();
      const res = await pointUseCase.getPointHistory();
      setHistory(res);
    } catch (error) {
      console.error("Error fetching point data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchPointHistory();
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
