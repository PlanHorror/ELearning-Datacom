"use client";

import { SingleCustomerResponse } from "@/modules/admin/domain/dto/customer.dto";
import { CustomerService } from "@/modules/admin/services/customer.service";
import { AccountStatus } from "@/shared/constants/account-status";
import { Gender } from "@/shared/constants/gender";
import { Button, Card, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styles from "./customer.component.module.scss";

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
        setCustomer(response);
        console.log("Customer:", response);
      } catch (error) {
        if (error.status === 404) {
          setCustomer(undefined);
        }
      }
    };
    fetchCustomer();
  }, [id]);
  return (
    <div>
      {customer ? (
        <div>
          <Card title="Customer Details" className={styles.card}>
            <Form layout="vertical" className={styles.form}>
              <Form.Item label="Email">
                <Input value={customer.email} />
              </Form.Item>
              <Form.Item label="Username">
                <Input value={customer.username} />
              </Form.Item>
              <Form.Item label="Postal Code">
                <Input value={customer.postal_code} />
              </Form.Item>
              <Form.Item label="Prefecture">
                <Input value={customer.prefecture} />
              </Form.Item>
              <Form.Item label="Gender">
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
                  defaultValue={customer.gender}
                />
              </Form.Item>
              <Form.Item label="Date of Birth">
                <DatePicker
                  defaultValue={customer.dob ? dayjs(customer.dob) : undefined}
                  format="YYYY-MM-DD"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Points">
                <Input value={customer.points} />
              </Form.Item>
              <Form.Item label="Status">
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
                  defaultValue={customer.status}
                />
              </Form.Item>
              <Form.Item label="Created At">
                <DatePicker
                  defaultValue={
                    customer.created_at ? dayjs(customer.created_at) : undefined
                  }
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Last Updated">
                <DatePicker
                  defaultValue={
                    customer.last_updated
                      ? dayjs(customer.last_updated)
                      : undefined
                  }
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item label="Last Login">
                <DatePicker
                  defaultValue={
                    customer.last_login ? dayjs(customer.last_login) : undefined
                  }
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  style={{ width: "100%" }}
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
          <Card title="Favourites" className={styles.card}>
            <ul>
              {customer.favourites.length > 0 ? (
                customer.favourites.map((favourite) => (
                  <li key={favourite}>{favourite}</li>
                ))
              ) : (
                <p className={styles.notFound}> No favourites found</p>
              )}
            </ul>
          </Card>
          <Card title="Points History" className={styles.card}>
            <ul>
              {customer.pointsHistories.length > 0 ? (
                customer.pointsHistories.map((pointsHistory) => (
                  <li key={pointsHistory}>{pointsHistory}</li>
                ))
              ) : (
                <p className={styles.notFound}>No points history found</p>
              )}
            </ul>
          </Card>
          <Card title="Coupon Usages" className={styles.card}>
            <ul>
              {customer.couponUsages.length > 0 ? (
                customer.couponUsages.map((couponUsage) => (
                  <li key={couponUsage}>{couponUsage}</li>
                ))
              ) : (
                <p className={styles.notFound}>No coupon usages found</p>
              )}
            </ul>
          </Card>
          <Card title="Learning Status" className={styles.card}>
            <ul>
              {customer.learningStatus.length > 0 ? (
                customer.learningStatus.map((status) => (
                  <li key={status}>{status}</li>
                ))
              ) : (
                <p className={styles.notFound}>No learning status found</p>
              )}
            </ul>
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
