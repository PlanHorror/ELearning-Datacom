"use client";

import {
  Card,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Button,
  message,
  Table,
} from "antd";
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

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const scoreData: ScoreInput = {
        email: values.email,
        courseName: values.courseName,
        score: values.score,
        completionTime: values.completionTime,
        completedAt: values.completedAt.format("YYYY-MM-DD"),
        notes: values.notes,
      };

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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Course Name",
      dataIndex: "courseName",
      key: "courseName",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
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
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
  ];

  return (
    <div className={styles.container}>
      <Card title="Input Score" className={styles.card}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className={styles.form}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input email" },
              { type: "email", message: "Please input valid email" },
            ]}
            labelCol={{ className: styles.form_label }}
          >
            <Input
              placeholder="Enter user email"
              className={styles.form_input}
            />
          </Form.Item>

          <Form.Item
            name="courseName"
            label="Course Name"
            rules={[{ required: true, message: "Please input course name" }]}
            labelCol={{ className: styles.form_label }}
          >
            <Input
              placeholder="Enter course name"
              className={styles.form_input}
            />
          </Form.Item>

          <Form.Item
            name="score"
            label="Score"
            rules={[
              { required: true, message: "Please input score" },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Score must be between 0 and 100",
              },
            ]}
            labelCol={{ className: styles.form_label }}
          >
            <InputNumber
              placeholder="Enter score (0-100)"
              className={styles.form_number_input}
            />
          </Form.Item>

          <Form.Item
            name="completionTime"
            label="Completion Time (minutes)"
            rules={[
              { required: true, message: "Please input completion time" },
              { type: "number", min: 0, message: "Time must be positive" },
            ]}
            labelCol={{ className: styles.form_label }}
          >
            <InputNumber
              placeholder="Enter completion time in minutes"
              className={styles.form_number_input}
            />
          </Form.Item>

          <Form.Item
            name="completedAt"
            label="Completion Date"
            rules={[
              { required: true, message: "Please select completion date" },
            ]}
            labelCol={{ className: styles.form_label }}
          >
            <DatePicker className={styles.form_date_picker} />
          </Form.Item>

          <Form.Item
            name="notes"
            label="Notes"
            labelCol={{ className: styles.form_label }}
          >
            <TextArea
              rows={4}
              placeholder="Enter any additional notes"
              className={styles.form_input}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className={styles.form_button}
            >
              Submit
            </Button>
          </Form.Item>
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
