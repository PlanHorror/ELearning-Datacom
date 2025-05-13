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
import { toast } from "sonner";
import { CustomerUseCase } from "@/modules/customers/domain/usecases/customer.usecase";
import { GetCustomerByIdResponse } from "@/modules/customers/domain/dto/getCustomer.dto";
import { useTranslations } from "next-intl";

const PointComponent = () => {
  const t = useTranslations();
  const { status } = useSession();
  const [points, setPoints] = useState<Point | null>(null);
  const [history, setHistory] = useState<PointHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<GetCustomerByIdResponse | null>(null);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const customerUseCase = new CustomerUseCase();
      const res = await customerUseCase.getCustomerById();
      if (res.status === 200) {
        setProfile(res.data);
      } else {
        toast.error(t("points.errorGetProfile"));
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error(t("points.errorGetProfile"));
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPointHistory = async () => {
    try {
      setIsLoading(true);
      const pointUseCase = new PointUseCase();
      const res = await pointUseCase.getPointHistory();
      setHistory(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching point data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchPointHistory();
      fetchProfile();
    }
  }, [status]);

  const columns = [
    {
      title: t("points.table.points"),
      dataIndex: "points",
      key: "points",
      render: (points: number, record: any) => (
        <span className={record.type === "ADD" ? styles.earn : styles.spend}>
          {record.type === "ADD" ? `+${points}` : `-${points}`}
        </span>
      ),
    },
    {
      title: t("points.table.type"),
      dataIndex: "type",
      key: "type",
      render: (type: string) => (
        <Tag color={type === "ADD" ? "green" : "red"}>
          {type === "ADD" ? t("points.type.earned") : t("points.type.used")}
        </Tag>
      ),
    },
    {
      title: t("points.table.description"),
      dataIndex: "description",
      key: "description",
    },
    {
      title: t("points.table.user"),
      dataIndex: "user",
      key: "user",
      render: () => <Tag color={"green"}>{profile?.username}</Tag>,
    },
    {
      title: t("points.table.date"),
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
          <Card title={t("points.totalPoints")} className={styles.point_card}>
            <div className={styles.point_content}>
              <Medal size={24} />
              <span className={styles.point_value}>{profile?.points || 0}</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card
            title={t("points.availablePoints")}
            className={styles.point_card}
          >
            <div className={styles.point_content}>
              <Medal size={24} />
              <span className={styles.point_value}>{profile?.points || 0}</span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card title={t("points.usedPoints")} className={styles.point_card}>
            <div className={styles.point_content}>
              <Medal size={24} />
              <span className={styles.point_value}>--</span>
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card
            title={
              <div className={styles.history_title}>
                <History size={20} />
                <span>{t("points.pointsHistory")}</span>
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
