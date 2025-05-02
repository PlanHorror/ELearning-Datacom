"use client";

import {
  Card,
  Form,
  Input,
  DatePicker,
  Button,
  message,
  Table,
  Select,
  TimePicker,
  Switch,
  Upload,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { ScoreService } from "../../../../admin/services/score.service";
import {
  ScoreInput,
  ScoreResponse,
} from "../../../../admin/domain/dto/score.dto";
import dayjs from "dayjs";
import styles from "./input.score.component.module.scss";

const { TextArea } = Input;

const InputScoreComponent = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [scores, setScores] = useState<ScoreResponse[]>([]);
  const listUser = [
    {
      id: "1",
      email: "a@gmal.com",
      username: "a",
    },
    {
      id: "2",
      email: "b@gmail.com",
      username: "b",
    },
    {
      id: "3",
      email: "c@gmail.com",
      username: "c",
    },
  ];
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      // const scoreData: ScoreInput = {
      //   email: values.email,
      //   courseName: values.courseName,
      //   score: values.score,
      //   completionTime: values.completionTime,
      //   completedAt: values.completedAt.format("YYYY-MM-DD"),
      //   notes: values.notes,
      // };
      const scoreData: ScoreInput = {
        userId: values.userId,
        lessonId: values.lessonId,
        completionTime: values.time.format("HH:mm:ss"),
        completedAt: values.completedAt.format("YYYY-MM-DD"),
        completionStatus: values.completion ? "true" : "false",
      };
      console.log("scoreData", scoreData);

      await ScoreService.getInstance().createScore(scoreData);
      message.success("Score added successfully");
      form.resetFields();
      fetchScores();
    } catch (error) {
      message.error("Failed to add score");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchScores = async () => {
    try {
      const data = await ScoreService.getInstance().getScores();
      setScores(data);
    } catch (error) {
      console.error("Error fetching scores:", error);
    }
  };

  const columns = [
    {
      title: "User",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Lesson",
      dataIndex: "lessonId",
      key: "lessonId",
    },
    {
      title: "Completion Time (minutes)",
      dataIndex: "completionTime",
      key: "completionTime",
    },
    {
      title: "Completed At",
      dataIndex: "completedAt",
      key: "completedAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Completion Status",
      dataIndex: "completionStatus",
      key: "completionStatus",
    },
  ];

  return (
    <div className={styles.container}>
      <Card title="Input Score" className={styles.card}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}>
          <Form.Item
            name="userId"
            label="User"
            rules={[{ required: true, message: "Please choose a user" }]}
            labelCol={{ className: styles.form_label }}>
            <Select
              showSearch
              optionFilterProp="label"
              options={listUser.map((user) => ({
                value: user.id,
                label: `${user.username} (${user.email})`,
              }))}
              placeholder="Search by email or username"
              className={styles.form_input}
            />
          </Form.Item>

          <Form.Item
            name="lessonId"
            label="Lesson ID"
            rules={[{ required: true, message: "Please choose a lesson id" }]}
            labelCol={{ className: styles.form_label }}>
            <Input
              placeholder="Enter lesson id"
              className={styles.form_input}
            />
          </Form.Item>

          <Form.Item
            name="time"
            label="Time"
            rules={[
              { required: true, message: "Please input completion time" },
            ]}>
            <TimePicker
              className={styles.form_time_picker}
              placeholder="Select time"
              format="HH:mm:ss"
            />
          </Form.Item>

          <Form.Item
            name="completedAt"
            label="Completion Date"
            rules={[
              { required: true, message: "Please select completion date" },
            ]}
            labelCol={{ className: styles.form_label }}>
            <DatePicker className={styles.form_date_picker} />
          </Form.Item>

          <Form.Item
            name={"completion"}
            label="Completion"
            rules={[
              { required: true, message: "Please select completion status" },
            ]}
            labelCol={{ className: styles.form_label }}
            valuePropName="checked">
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className={styles.form_button}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title="Upload score" className={styles.card}>
        <Form layout="vertical">
          <Upload>
            <Button type="primary" icon={<UploadOutlined />}>
              Upload
            </Button>
          </Upload>
        </Form>
      </Card>
      <Card title="Score History" className={styles.card}>
        <Table
          dataSource={scores}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          className={styles.table}
          components={{
            header: {
              cell: (props: any) => (
                <th {...props} className={styles.table_header} />
              ),
            },
            body: {
              row: (props: any) => (
                <tr {...props} className={styles.table_row} />
              ),
            },
          }}
        />
      </Card>
    </div>
  );
};

export default InputScoreComponent;
