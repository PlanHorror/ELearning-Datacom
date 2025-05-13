"use client";

import { Layout, theme, Button, Space } from "antd";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { adminAuthService } from "@/modules/admin/services/admin.auth.service";
import { useEffect, useState } from "react";

const { Header } = Layout;

const AdminHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const t = useTranslations();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const session = adminAuthService.getSession();
    if (session?.admin) {
      setUsername(session.admin.username);
    }
  }, []);

  const handleLogout = () => {
    adminAuthService.logout();
    router.push("/admin/login");
  };

  return (
    <Header style={{ padding: "0 24px", background: colorBgContainer }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <Space>
          <span>Welcome, {username}</span>
          <Button type="primary" danger onClick={handleLogout}>
            {t("admin.logout")}
          </Button>
        </Space>
      </div>
    </Header>
  );
};

export default AdminHeader;
