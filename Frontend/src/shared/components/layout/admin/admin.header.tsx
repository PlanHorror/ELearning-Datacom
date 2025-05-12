"use client";

import { Layout, theme } from "antd";

const { Header } = Layout;

const AdminHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return <Header style={{ padding: 0, background: colorBgContainer }}>Dashboard</Header>;
};

export default AdminHeader;
